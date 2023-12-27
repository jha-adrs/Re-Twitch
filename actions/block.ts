"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { followUser, unfollowUser } from "@/lib/follow-service";
import { logger } from "@/lib/logger";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
  );
export const onBlock = async (id: string) => {
    try {
        const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
    
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${self.username}/community`);
        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocked.username}`);
        }
        return blockedUser;
    } catch (error) {
        logger.error("Error in actions/follow.ts ", error);
        throw new Error("Error in actions/follow.ts ");
    }
}

export const onUnblock = async (id: string) => {
    try {
        logger.info("onUnBlock", id);
        const unblockedUser = await unblockUser(id);
        revalidatePath(`/`);
        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`);
        }
        return unblockedUser;
    } catch (error) {
        logger.error("Error in actions/follow.ts unfollow", error);
        throw new Error("Error in actions/follow.ts unfollow");
    }
}
