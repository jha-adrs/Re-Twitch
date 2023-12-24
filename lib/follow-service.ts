import { db } from "@/lib/db";
import { logger } from "./logger";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();
        if (!self) {
            return [];
        }
        const users = await db.follow.findMany({
            where: {
                followerId: self.id,
                following:{
                    blocking:{
                        none:{
                            blockedId:self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include:{
                        stream:{
                            select:{
                                isLive:true
                            }
                        }
                    }
                },
                
            }
        });
        logger.info("getFollowedUsers: ", users);
        return users;
    } catch (error) {
        logger.error(`getFollowedUsers: `,error);
        return [];
    }

}

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
        }, include: {
            following: true,
            follower: true
        }
    });
    return follow;
}

export const unfollowUser = async (id: string) => {
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
    if (otherUser.id === self.id) {
        throw new Error("Cannot unfollow yourself!");
    }
    const followResponse = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });
    if (!followResponse) {
        throw new Error("Not following");
    }
    const follow = await db.follow.delete({
        where: {
            id: followResponse.id
        },
        include: {
            following: true
        }
    });
    return follow;
}