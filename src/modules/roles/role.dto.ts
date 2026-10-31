import { z } from "zod";

export const createRoleSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;
