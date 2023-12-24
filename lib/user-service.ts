import { db } from "./db"

export const getuserByUsername = async (username:string)=>{
    const user = await db.user.findUnique({
        where:{
            username: username
        },include: {
            stream: {
                select:{
                    id: true,
                    name: true,
                    thumbnailUrl: true,
                    serverUrl: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    userId: true,
                }
            }
        }
    });
    return user;
}

export const getUserById = async (id:string)=>{
    const user = await db.user.findUnique({
        where:{
            id: id
        },include: {
            stream: {
                select:{
                    id: true,
                    name: true,
                    thumbnailUrl: true,
                    serverUrl: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    userId: true,
                }
            }
        }
    });
    return user;
}