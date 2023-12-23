"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { updateStreamSchema } from "@/lib/validators/stream";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
    try {
        
        const self = await getSelf();
        logger.info("Updating stream info", values, "self",self);
        if (!self) {
            throw new Error("Not logged in");
        }
        const selfStream = await db.stream.findUnique({
            where: { 
                userId: self.id
             }
        });
        if (!selfStream) {
            throw new Error("No stream found");
        }
        const {
            name,
            isChatEnabled,
            isChatFollowersOnly,
            isChatDelayed,
        } =  updateStreamSchema.parse(values);
        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data:{
                name,
                isChatEnabled,
                isChatFollowersOnly,
                isChatDelayed,
            }
        })
        revalidatePath(`/u/${self.username}/chat`); // Creator dashboard
        revalidatePath(`/u/${self.username}`); // Home page for internal users
        revalidatePath(`/${self.username}`); // Home page for external users

        return stream;

    } catch (error) {
        logger.error("Error updating stream info", error);
        throw new Error("Error updating stream info");
    }
}