"use server";
import { CreateIngressOptions, IngressAudioEncodingPreset, IngressClient, IngressInput, IngressVideoEncodingPreset, RoomServiceClient } from "livekit-server-sdk"

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const resetIngress = async (hostIdentity: string)=>{
    logger.info("resetting ingress");
    if(!hostIdentity){
        throw new Error("Unauthorized");
    }
    const self= await getSelf();
    if(!self){
        throw new Error("Unauthorized");
    }

    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    })
    const rooms  = await roomService.listRooms([hostIdentity]);
    // Now loop through all ingresses and rooms and delete them
    // Delete rooms first
    for(const room of rooms){
        await roomService.deleteRoom(room.name);
    }
    // Now delete ingresses
    for(const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }

    

}


export const createIngress = async (ingressType: IngressInput)=>{
    logger.info("creating ingress")
    const self= await getSelf();
    if(!self || !self.id){
        throw new Error("Unauthorized");
    }
    await resetIngress(self.id);
    const options : CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id,
    }
    if(ingressType === IngressInput.WHIP_INPUT){
        options.bypassTranscoding = true;
    } else{
        options.video = {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
        };
        options.audio = {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        };
    }

    const ingress = await ingressClient.createIngress(
        ingressType,
        options
    );
    if(!ingress || !ingress.url || ! ingress.streamKey){
        logger.error("failed to create ingress", ingress, "options", options);
        throw new Error("failed to create ingress");
    }

    await db.stream.update({
        where: {userId: self.id},
        data: {
            ingressId: ingress.ingressId,
            streamkey: ingress.streamKey,
            serverUrl: ingress.url,
        }
    })

    revalidatePath(`/u/${self.username}/keys`);
    return ingress;

}