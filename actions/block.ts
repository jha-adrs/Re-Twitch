"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { followUser, unfollowUser } from "@/lib/follow-service";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    try {
        logger.info("onFollow", id);
        const blockedUser = await blockUser(id);
        revalidatePath(`/`);
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
        logger.info("onUnfollow", id);
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
