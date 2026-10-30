import type {
    CreateEmployeeData,
    CreateEmployeeDto,
    GetEmployeesQueryDto,
} from "./employee.dto.js";
import Employee from "./employee.model.js";

export function create(data: CreateEmployeeData) {
    return Employee.create(data);
}

export function findAll(filters: GetEmployeesQueryDto) {
    const query: Record<string, unknown> = {};

    if (filters.firstName) {
        query.firstName = {
            $regex: escapeRegex(filters.firstName),
            $options: "i",
        };
    }

    if (filters.lastName) {
        query.lastName = {
            $regex: escapeRegex(filters.lastName),
            $options: "i",
        };
    }
    return Employee.find(query);
}

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function existsByWorkEmail(workEmail: string): Promise<boolean> {
    const employee = await Employee.exists({ workEmail });
    return employee !== null;
}
