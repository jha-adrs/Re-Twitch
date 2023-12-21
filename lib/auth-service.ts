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