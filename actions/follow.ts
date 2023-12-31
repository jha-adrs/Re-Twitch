"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        logger.info("onFollow", id);
        const followeduser = await followUser(id);
        revalidatePath(`/`);
        if (followeduser) {
            revalidatePath(`/${followeduser.following.username}`);
        }
        return followeduser;
    } catch (error) {
        logger.error("Error in actions/follow.ts ", error);
        throw new Error("Error in actions/follow.ts ");
    }
}

export const onUnfollow = async (id: string) => {
    try {
        logger.info("onUnfollow", id);
        const unfolloweduser = await unfollowUser(id);
        revalidatePath(`/`);
        if (unfolloweduser) {
            revalidatePath(`/${unfolloweduser.following.username}`);
        }
        return unfolloweduser;
    } catch (error) {
        logger.error("Error in actions/follow.ts unfollow", error);
        throw new Error("Error in actions/follow.ts unfollow");
    }
}
