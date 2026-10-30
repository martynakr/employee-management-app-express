import type { CreateDepartmentDto } from "./department.dto.js";
import * as departmentRepository from "./department.repository.js";

export function createDepartment(data: CreateDepartmentDto) {
    return departmentRepository.create(data);
}

export function getDepartments() {
    return departmentRepository.findAll();
}
