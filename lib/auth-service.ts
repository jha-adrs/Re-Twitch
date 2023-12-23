import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export const getSelf = async () => {
    try {
        const self = await currentUser();

    if (!self || !self.username) {
        logger.warn("Unauthorized, user not found", self);
        return null;
    }
    const user = await db.user.findUnique({
        where: {
            username: self.username
        }
    });

    if (!user) {
        logger.warn("Unauthorized, user not found in DB");
        return null;
    }
    return user;
    } catch (error) {
        logger.error("Error in auth-service getSelf",error);
        return null;
    }
};

export const getSelfByUsername = async (username: string) => {
    const user = await currentUser();
    if(!user || !user.username) {
        return null;
    }
    const self = await db.user.findUnique({
        where:{
            username
        }
    });
    if(!self) {
        logger.error("User not found in DB, but found in Clerk");
        //return null;
        throw new Error("User not found in DB");
    }
    if(self.username !== user.username) {
        logger.error("Unauthorized, user does not match");
        throw new Error("Unauthorized");
    }
    return self;

}