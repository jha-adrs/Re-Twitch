import { getSelf } from "./auth-service"
import { db } from "./db";
import { logger } from "./logger";

export const isBlockedByUser = async( id:string)=>{
    try {
        const self = await getSelf();
        if(!self)return null;
        const otherUser = await db.user.findUnique({where:{id}});
        if(!otherUser) return null;
        if(self.id === otherUser.id) return false;
        // Find Unique uses the indexes and is faster than findFirst
        const isBlocked = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId:self.id,
                    blockedId:otherUser.id
                }
            }
        })
        return !!isBlocked;

    } catch (error) {
        logger.error("Error in block-service",error);
        return false;
    }
}

export const blockUser = async(id:string)=>{
    try {
        const self = await getSelf();
        if(!self) throw new Error("Not logged in");
        const otherUser = await db.user.findUnique({where:{id}});
        if(!otherUser) throw new Error("User not found");
        if(self.id === otherUser.id) throw new Error("Cannot block yourself");
        const isBlocked = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId:self.id,
                    blockedId:otherUser.id
                }
            }
        })
        if(isBlocked) throw new Error("User already blocked");
        const block = await db.block.create({
            data:{
                blockerId:self.id,
                blockedId:otherUser.id
            },
            include:{
                blocked:true
            }
        })
        return block;
    } catch (error) {
        logger.error("Error in block-service",error);
        throw error;
    }
}

export const unblockUser = async(id:string)=>{
    try {
        const self = await getSelf();
        if(!self) throw new Error("Not logged in");
        const otherUser = await db.user.findUnique({where:{id}});
        if(!otherUser) throw new Error("User not found");
        if(self.id === otherUser.id) throw new Error("Cannot unblock yourself");
        const isBlocked = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId:self.id,
                    blockedId:otherUser.id
                }
            }
        })
        if(!isBlocked) throw new Error("User not blocked");
        const block = await db.block.delete({
            where:{
                blockerId_blockedId:{
                    blockerId:self.id,
                    blockedId:otherUser.id
                }
            },
            include:{
                blocked:true
            }
        })
        return block;
    } catch (error) {
        logger.error("Error in block-service",error);
        throw error;
    }
}