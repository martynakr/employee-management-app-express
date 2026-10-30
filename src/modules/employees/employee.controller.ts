import type { RequestHandler } from "express";
import * as employeeService from "./employee.service.js";
import type { CreateEmployeeDto } from "./employee.dto.js";

export const createEmployee: RequestHandler = async (req, res, next) => {
    try {
        const employee = await employeeService.createEmployee(
            req.body as CreateEmployeeDto,
        );

        res.status(201).json(employee);
    } catch (error) {
        next(error);
    }
};

export const getEmployees: RequestHandler = async (req, res, next) => {
    try {
        const employees = await employeeService.getEmployees(
            res.locals.validatedQuery,
        );

        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
};
