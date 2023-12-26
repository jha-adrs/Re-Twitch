import { Stream } from "@prisma/client";
import { ZodBoolean, ZodString, z } from "zod";




export const updateStreamSchema = z.object({
    name: z.string().optional() ,
    isChatEnabled: z.boolean().optional() ,
    isChatFollowersOnly : z.boolean().optional() ,
    isChatDelayed: z.boolean().optional() ,
    thumbnailUrl: z.string().optional().nullable() ,
});