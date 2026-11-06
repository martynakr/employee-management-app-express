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
    const terms = filters.search?.trim().split(/\s+/).filter(Boolean) ?? [];

    const query = terms.length
        ? {
              $and: terms.map((term) => {
                  const regex = { $regex: escapeRegex(term), $options: "i" };
                  return { $or: [{ firstName: regex }, { lastName: regex }] };
              }),
          }
        : {};

    return Employee.find(query);
}

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function existsByWorkEmail(workEmail: string): Promise<boolean> {
    const employee = await Employee.exists({ workEmail });
    return employee !== null;
}

export function findById(employeeId: string) {
    return Employee.findById(employeeId);
}

export async function existsById(employeeId: string) {
    const employee = await Employee.exists({ _id: employeeId });
    return employee !== null;
}
