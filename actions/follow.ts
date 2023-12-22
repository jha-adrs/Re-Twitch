"use server";

import { logger } from "@/lib/logger";

export const onFollow = async (id:string)=>{
    try {
        logger.info("onFollow", id);
        //await new Promise( resolve => setTimeout(resolve, 5000));
        return true;
    } catch (error) {
        throw new Error("Error in actions/follow.ts ");
    }
}
