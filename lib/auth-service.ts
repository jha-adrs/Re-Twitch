import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        logger.warn("Unauthorized, user not found");
        return null;
    }
    const user = await db.user.findUnique({
        where: {
            username: self.username
        }
    });

    if (!user) {
        logger.warn("Unauthorized, user not found in DB");
        throw new Error("Unauthorized");
    }
    return user;
};

export const getSelfByUsername = async (username: string) => {
    const user = await currentUser();
    if(!user || !user.username) {
        throw new Error("Unauthorized");
    }
    const self = await db.user.findUnique({
        where:{
            username
        }
    });
    if(!self) {
        logger.error("User not found in DB, but found in Clerk");
        throw new Error("User not found in DB");
    }
    if(self.username !== user.username) {
        logger.error("Unauthorized, user does not match");
        throw new Error("Unauthorized");
    }
    return self;

}