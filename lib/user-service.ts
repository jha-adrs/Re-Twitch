import { db } from "./db"

export const getuserByUsername = async (username:string)=>{
    const user = await db.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          externalUserId: true,
          username: true,
          bio: true,
          imageUrl: true,
          stream: {
            select: {
              id: true,
              isLive: true,
              isChatDelayed: true,
              isChatEnabled: true,
              isChatFollowersOnly: true,
              thumbnailUrl: true,
              name: true,
            },
          },
          _count: {
            select: {
              followedBy: true,
            },
          },
        },
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