import { Router } from "express";
import { validateBody } from "../../middleware/validate.js";
import { createDepartmentSchema } from "./department.dto.js";
import { createDepartment, getDepartments } from "./department.controller.js";

const router = Router();

/**
 * @openapi
 * /api/departments:
 *   post:
 *     summary: Create a department
 *     tags:
 *       - Departments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Engineering
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Department already exists
 */
router.post("/", validateBody(createDepartmentSchema), createDepartment);

/**
 * @openapi
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: List of departments
 */
router.get("/", getDepartments);

export default router;
