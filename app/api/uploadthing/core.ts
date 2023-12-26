import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { logger } from "@/lib/logger";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  thumbnailUploader: f({ 
    image: { 
      maxFileSize: "8MB", 
      maxFileCount: 1 ,
      
    } ,
  })
    .middleware(async () => {
      const self = await getSelf();
        logger.info("Updating stream info middleware", "self",self);
      return { user: self }
    })
    .onUploadComplete(async ({ metadata, file }) => {
        logger.info("Updating stream info", file, "self",metadata.user);
        if (!file?.url){
            throw new Error("No file url");
        }
      await db.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;