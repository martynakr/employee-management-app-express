import { z } from "zod";

export const createEmployeeSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.email({ error: "Invalid email address" }).trim(),
});

export const getEmployeesQuerySchema = z.object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;

export type GetEmployeesQueryDto = z.infer<typeof getEmployeesQuerySchema>;

export interface CreateEmployeeData extends CreateEmployeeDto {
    workEmail: string;
}
