import { z } from "zod";

export const searchSchema = z.object({
    search: z.string().trim(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
