"use server"
import { v4 } from "uuid"
import { AccessToken } from "livekit-server-sdk"

import { getSelf } from "@/lib/auth-service"
import { getUserById } from "@/lib/user-service"
import { logger } from "@/lib/logger"
import { isBlockedByUser } from "@/lib/block-service"

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await getSelf();
        if (!self) {
            throw new Error("Not logged in");
        }
    } catch (error) {
        logger.error("Failed to create viewer token", error);
        // Create guest token instead
        const id = v4();
        const username = `guest-${Math.floor(Math.random() * 10000)}`;
        self = { id, username };
    }
    const host = await getUserById(hostIdentity);
    if (!host) {
        logger.error("Host not found");
        throw new Error("Host not found");
    }
    // See if blocked
    const blocked = await isBlockedByUser(host.id);
    if (blocked) {
        logger.error("Blocked by host");
        throw new Error("Blocked by host");
    }
    const isHost = self.id === host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${host.id}` : self.id,
            name: self.username
        }
        );
    logger.info("Creating token for", self.username, "isHost", isHost);
    // TODO: Needs review
    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    });

    return await Promise.resolve(token.toJwt())
}