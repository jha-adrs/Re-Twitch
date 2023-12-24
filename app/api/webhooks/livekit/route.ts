import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
    logger.info("POST /api/webhooks/livekit");
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
        return new Response("Unauthorized", { status: 401 });
    }

    logger.info("authorization: ", authorization);
    logger.info("body: ", body);
    try {

        const event = receiver.receive(body, authorization);
        if (event.event === "ingress_ended") {
            await db.stream.update({
                where: {
                    ingressId: event.ingressInfo?.ingressId
                },
                data: {
                    isLive: false
                }
            })

            return new Response("OK", { status: 200 });
        }
        else if (event.event === "ingress_started") {
            await db.stream.update({
                where: {
                    ingressId: event.ingressInfo?.ingressId
                },
                data: {
                    isLive: true
                }
            })

            return new Response("OK", { status: 200 });
        } else {
            logger.warn("Unhandled event: ", event);
            return new Response("OK", { status: 200 });
        }
    } catch (error) {
        logger.error("Error in POST /api/webhooks/livekit", error);
        return new Response("Error", { status: 500 });
    }
}