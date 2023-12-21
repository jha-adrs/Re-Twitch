import {ZodBoolean, ZodObject, ZodString, z} from 'zod';

export const webhookCreateUserEventSchema  = z.object({
    id: z.string() as ZodString,
    username: z.string() as ZodString,
    image_url: z.string().url() as ZodString,
    email: z.string().email().optional(),
    first_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),

});

export const webhookUpdateUserEventSchema  = z.object({
    id: z.string() as ZodString,
    username: z.string() as ZodString,
    image_url: z.string().url() as ZodString,
    email: z.string().email().optional(),
    first_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),

});

export const webhookDeleteUserEventSchema  = z.object({
    id: z.string() as ZodString,
    deleted: z.boolean() as ZodBoolean,
    
});