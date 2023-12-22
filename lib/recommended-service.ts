import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";
import { logger } from "./logger";

export const getRecommended = async () => {
    try {
        //await new Promise(resolve => setTimeout(resolve, 5000));
        const self = await getSelf();
        let whereClause : object = {};
        if(self) whereClause = { id: { not: self?.id } };

        const users = await db.user.findMany({
            where: whereClause,
            orderBy:{
                createdAt: "desc" // Add following count, watching count etc
            }
        }
        );
        logger.info("getRecommended: ", users);
        return users;
    } catch (error) {
        logger.error(`getRecommended: ${error}`);
        return [];
    }
};