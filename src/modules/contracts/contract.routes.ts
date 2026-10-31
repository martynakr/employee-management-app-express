import { Router } from "express";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 665f1c2e8a1b2c3d4e5f6a80
 *         employeeId:
 *           type: string
 *         contractType:
 *           type: string
 *           enum: [FIXED_TERM, ONGOING]
 *         employmentBasis:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, CASUAL]
 *         hoursPerWeek:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         salary:
 *           type: number
 *         departmentId:
 *           type: string
 *         roleId:
 *           type: string
 *         active:
 *           type: boolean
 *           description: Derived from startDate and endDate
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default router;
