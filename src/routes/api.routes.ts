import { Router } from "express";
import departmentRoutes from "../modules/departments/department.routes.js";
import employeeRoutes from "../modules/employees/employee.routes.js";

const router = Router();

router.use("/departments", departmentRoutes);
router.use("/employees", employeeRoutes);

export default router;
