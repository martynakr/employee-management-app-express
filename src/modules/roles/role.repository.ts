import type { CreateRoleDto } from "./role.dto.js";
import Role from "./role.model.js";

export function create(data: CreateRoleDto) {
    return Role.create(data);
}

export function findAll() {
    return Role.find().sort({ name: 1 });
}

export function findById(id: string) {
    return Role.findById(id);
}
