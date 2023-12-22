import { db } from "@/lib/db";
import { logger } from "./logger";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();
        if (!self) {
            return false;
        }
        const otherUser = await db.user.findUnique({
            where: {
                id: id
            }
        });
        if (!otherUser) {
            return false;
        }
        if (otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self?.id,
                followingId: otherUser.id
            }
        });
        logger.info(existingFollow, "existingFollow");
        return !!existingFollow;

    } catch (error) {
        logger.error("Error in follow-service ", error);
        return false;
    }
}

export const followUser = async (id: string) => {

    const self = await getSelf();
    if (!self) {
        throw new Error("Unauthorized");
    }
    const otherUser = await db.user.findUnique({
        where: {
            id: id
        }
    });
    if (!otherUser) {
        throw new Error("User not found");
    }

    const followResponse = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });
    if (followResponse) {
        throw new Error("Already following");
    }
    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });
    return follow;
}