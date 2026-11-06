import { z } from "zod";

export const chatSchema = z.object({
    question: z
        .string()
        .trim()
        .min(1, "Question is required")
        .max(2000, "Question is too long"),
});

export type ChatInput = z.infer<typeof chatSchema>;
