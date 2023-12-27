import { Webhook } from "svix";
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";
import { webhookCreateUserEventSchema, webhookDeleteUserEventSchema, webhookUpdateUserEventSchema } from "@/lib/validators/webhooks";
import { ZodError } from "zod";
import { resetIngress } from "@/actions/ingress";

export async function POST(req: Request) {
    try {
        logger.info("Starting Clerk Webhook");
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string | undefined;
        if (!WEBHOOK_SECRET) {
            throw new Error("Missing Clerk Webhook Secret");
        }
        const headerPayload = headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_signature = headerPayload.get("svix-signature");
        const svix_timestamp = headerPayload.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Missing required headers", { status: 400 });
        }
        const payload = await req.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(WEBHOOK_SECRET);

        let evt: WebhookEvent;

        try {
            logger.info("Webhook received", { svix_id, svix_timestamp });
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as WebhookEvent;

        } catch (error) {
            logger.error("Webhook verification failed", { svix_id, svix_timestamp, error });
            return new Response("Invalid signature", { status: 400 });
        }


        const eventType = evt?.type as string;
        logger.info("Webhook verified", { svix_id, svix_timestamp, eventType });

        if (eventType === "user.created") {
            const { id, username, image_url } = webhookCreateUserEventSchema.parse(payload.data);
            logger.info("Webhook create payload", { id, username, image_url });
            await db.user.create({
                data: {
                    externalUserId: id,
                    username: username,
                    imageUrl: image_url,
                    stream:{
                        create: {
                            name: `${username}'s stream`
                        }
                    }
                }
            });
        } else if (eventType === "user.updated") {
            const { id, username, image_url } = webhookUpdateUserEventSchema.parse(payload.data);
            logger.info("Webhook update payload", { id, username, image_url });
            const currentUser = await db.user.findUnique({
                where: {
                    externalUserId: id
                }
            });
            if (!currentUser) {
                logger.error("Update request for non-existent user", { id, username, image_url });
                return new Response("Update request for non-existent user", { status: 404 });
            }
            await db.user.update({
                where: {
                    externalUserId: id
                },
                data: {
                    username: username,
                    imageUrl: image_url
                }
            });

        } else if (eventType === "user.deleted") {
            const { id, deleted } = webhookDeleteUserEventSchema.parse(payload.data);
            logger.info("Webhook delete payload", { id, deleted });
            // Delete ingresess
            await resetIngress(id);
            const currentUser = await db.user.findUnique({
                where: {
                    externalUserId: id
                }
            });
            if (!currentUser || !deleted) {
                logger.error("Delete request for non-existent user", { id, deleted });
                return new Response("Delete request for non-existent user", { status: 404 });
            }
            await db.user.delete({
                where: {
                    externalUserId: id
                }
            });
        }
        else {
            logger.info("Webhook event not handled", { eventType });
            return new Response("Webhook event not handled", { status: 400 });
        }


        return new Response(`Webhook received: ${eventType}`, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error("Webhook validation failed", { error });
            return new Response("Invalid payload", { status: 400 });
        }
        logger.error("Webhook failed", { error });
        return new Response("Internal server error", { status: 500 });
    }

}