import { z } from "zod";

export const createContractSchema = z
    .object({
        contractType: z.enum(["FIXED_TERM", "ONGOING"]),
        employmentBasis: z.enum(["FULL_TIME", "PART_TIME", "CASUAL"]),
        hoursPerWeek: z.number().min(1).max(38),

        startDate: z.coerce.date(),

        endDate: z.coerce.date().nullable().optional().default(null),

        salary: z.number().min(0),

        departmentId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid department ID"),

        roleId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid role ID"),
    })
    .refine((data) => !data.endDate || data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    });

export type CreateContractDto = z.infer<typeof createContractSchema>;

export interface CreateContractData extends CreateContractDto {
    employeeId: string;
}
