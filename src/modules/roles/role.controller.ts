import type { RequestHandler } from "express";
import * as roleService from "./role.service.js";

export const createRole: RequestHandler = async (req, res, next) => {
    try {
        const role = await roleService.createRole(req.body);

        res.status(201).json(role);
    } catch (error) {
        next(error);
    }
};

export const getDepartments: RequestHandler = async (_req, res, next) => {
    try {
        const departments = await roleService.getRoles();

        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};
