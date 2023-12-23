import { db } from "@/lib/db";

import { getSelf } from "@/lib/auth-service";
import { logger } from "./logger";

export const getRecommended = async () => {
    try {
        //await new Promise(resolve => setTimeout(resolve, 5000));
        let userId;


        try {
            const self = await getSelf();
            userId = self?.id;
        } catch (error) {
            userId = null;
        }
        let users = [];

        if (userId) {
            users = await db.user.findMany({
                where: {
                    AND: [
                        {
                            NOT: { id: userId }
                        },
                        {
                            NOT: { followedBy: { some: { followerId: userId } } }
                        },
                        {
                            NOT: {
                                blocking: {
                                    some: { blockedId: userId }
                                }
                            }
                        }
                    ]
                }
            })
        } else {
            users = await db.user.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            })
        }


        logger.info("getRecommended: ", users);
        return users;
    } catch (error) {
        logger.error(`getRecommended: ${error}`);
        return [];
    }
};