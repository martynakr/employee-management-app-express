import type { RequestHandler } from "express";
import * as departmentService from "./department.service.js";

export const createDepartment: RequestHandler = async (req, res, next) => {
    try {
        const department = await departmentService.createDepartment(req.body);

        res.status(201).json(department);
    } catch (error) {
        next(error);
    }
};

export const getDepartments: RequestHandler = async (_req, res, next) => {
    try {
        const departments = await departmentService.getDepartments();

        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};
