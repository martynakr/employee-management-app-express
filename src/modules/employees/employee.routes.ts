import { Router } from "express";
import { validateBody, validateQuery } from "../../middleware/validate.js";
import {
    createEmployeeSchema,
    getEmployeesQuerySchema,
} from "./employee.dto.js";

import { createEmployee, getEmployees } from "./employee.controller.js";

const router = Router();
/**
 * @openapi
 * /api/employees:
 *   post:
 *     summary: Create an employee
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jack
 *               lastName:
 *                 type: string
 *                 example: Black
 *               email:
 *                 type: string
 *                 example: jack.black@mail.com
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Employee with provided email already exists
 */
router.post("/", validateBody(createEmployeeSchema), createEmployee);
router.get("/", validateQuery(getEmployeesQuerySchema), getEmployees);

export default router;
