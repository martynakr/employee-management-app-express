import { Router } from "express";
import {
    validateBody,
    validateObjectId,
    validateQuery,
} from "../../middleware/validate.js";
import {
    createEmployeeSchema,
    getEmployeesQuerySchema,
} from "./employee.dto.js";

import { createEmployee, getEmployees } from "./employee.controller.js";
import {
    createContract,
    getContracts,
} from "../contracts/contract.controller.js";
import { createContractSchema } from "../contracts/contract.dto.js";

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

/**
 * @openapi
 * /api/employees/{employeeId}/contracts:
 *   post:
 *     summary: Create a contract for an employee
 *     tags:
 *       - Contracts
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: The ID of the employee the contract belongs to
 *         example: 665f1c2e8a1b2c3d4e5f6a7b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contractType
 *               - employmentBasis
 *               - hoursPerWeek
 *               - startDate
 *               - salary
 *               - departmentId
 *               - roleId
 *             properties:
 *               contractType:
 *                 type: string
 *                 enum: [FIXED_TERM, ONGOING]
 *                 example: ONGOING
 *               employmentBasis:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, CASUAL]
 *                 example: FULL_TIME
 *               hoursPerWeek:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 38
 *                 example: 38
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-05
 *               endDate:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 description: Omit or set to null for an open-ended contract
 *                 example: 2027-01-04
 *               salary:
 *                 type: number
 *                 minimum: 0
 *                 example: 85000
 *               departmentId:
 *                 type: string
 *                 example: 665f1c2e8a1b2c3d4e5f6a7c
 *               roleId:
 *                 type: string
 *                 example: 665f1c2e8a1b2c3d4e5f6a7d
 *     responses:
 *       201:
 *         description: Contract created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       400:
 *         description: Invalid employee ID or request body
 *       404:
 *         description: Employee not found
 *       422:
 *         description: Department or role does not exist, or the contract overlaps an existing one
 */
router.post(
    "/:employeeId/contracts",
    validateObjectId("employeeId"),
    validateBody(createContractSchema),
    createContract,
);

router.get(
    "/:employeeId/contracts",
    validateObjectId("employeeId"),
    getContracts,
);

export default router;
