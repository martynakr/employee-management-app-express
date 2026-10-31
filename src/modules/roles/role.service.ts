import type { CreateRoleDto } from "./role.dto.js";
import Role from "./role.model.js";
import * as roleRepository from "./role.repository.js";

export async function findById(id: string) {
    return Role.findById(id);
}

export function createRole(data: CreateRoleDto) {
    return roleRepository.create(data);
}

export function getRoles() {
    return roleRepository.findAll();
}
