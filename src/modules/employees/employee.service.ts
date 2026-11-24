import type {
    CreateEmployeeDto,
    GetEmployeesQueryDto,
} from "./employee.dto.js";
import * as employeeRepository from "./employee.repository.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export async function createEmployee(data: CreateEmployeeDto) {
    const workEmail = await generateWorkEmail(data.firstName, data.lastName);
    return employeeRepository.create({ ...data, workEmail });
}

export async function getEmployees(filters: GetEmployeesQueryDto) {
    return employeeRepository.findAll(filters);
}

export async function getEmployeeById(employeeId: string) {
    const employee = await employeeRepository.findById(employeeId);

    if (!employee) {
        throw new NotFoundError(
            "Employee with id: " + employeeId + " not found",
        );
    }

    return employee;
}

async function generateWorkEmail(
    firstName: string,
    lastName: string,
): Promise<string> {
    const domain = "employr.com";

    const baseEmail = `${firstName}.${lastName}`.toLowerCase();

    let workEmail = `${baseEmail}@${domain}`;
    let counter = 1;

    while (await employeeRepository.existsByWorkEmail(workEmail)) {
        workEmail = `${baseEmail}${counter}@${domain}`;
        counter++;
    }
    return workEmail;
}
