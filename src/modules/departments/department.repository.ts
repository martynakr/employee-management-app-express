import type { CreateDepartmentDto } from "./department.dto.js";
import Department from "./department.model.js";

export function create(data: CreateDepartmentDto) {
    return Department.create(data);
}

export function findAll() {
    return Department.find().sort({ name: 1 });
}
