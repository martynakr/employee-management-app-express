import type { CreateContractDto } from "./contract.dto.js";
import * as employeeRepository from "../employees/employee.repository.js";
import * as departmentRepository from "../departments/department.repository.js";
import * as roleRepository from "../roles/role.repository.js";
import * as contractRepository from "./contract.repository.js";
import { ValidationError } from "../../errors/ValidationError.js";
import Contract from "./contract.model.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export async function createContractForEmployee(
    employeeId: string,
    data: CreateContractDto,
) {
    const errors: Record<string, string> = {};
    const employee = await employeeRepository.existsById(employeeId);

    if (!employee) {
        throw new NotFoundError(
            "Employee with id: " + employeeId + " not found",
        );
    }

    const [department, role, hasOverlap] = await Promise.all([
        departmentRepository.findById(data.departmentId),
        roleRepository.findById(data.roleId),
        contractRepository.overlappingContractExists(
            employeeId,
            data.startDate,
            data.endDate,
        ),
    ]);

    if (!department) {
        errors.departmentId = "Department does not exist";
    }
    if (!role) {
        errors.roleId = "Role does not exist";
    }
    if (hasOverlap) {
        errors.startDate = "Employee already has a contract during this period";
    }

    if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
    }

    return await contractRepository.create({ ...data, employeeId });
}

export async function getContractsForEmployee(employeeId: string) {
    const employee = await employeeRepository.existsById(employeeId);

    if (!employee) {
        throw new NotFoundError(
            "Employee with id: " + employeeId + " not fund",
        );
    }

    return await contractRepository.findAllByEmployeeId(employeeId);
}
