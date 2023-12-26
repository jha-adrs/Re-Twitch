"use client";

import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "../ui/skeleton";




interface VideoProps {
    hostname: string;
    hostIdentity: string;
}

export const Video = ({hostIdentity,hostname}: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((t) => t.participant.identity === hostIdentity);

    let content;

    if(!participant && connectionState === ConnectionState.Connected){
        content = <OfflineVideo username={hostname} />
    }else if (!participant || tracks.length === 0){ 
        content = <LoadingVideo label={connectionState} />
    }else{
        content = <LiveVideo participant={participant} />
    }

    return (
        <div className="aspect-video border-b group relative rounded-none">
            {content}
        </div>
    )
}
export const VideoSkeleton = () => {
    return (
      <div className="aspect-video border-x border-background">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
    );
  };