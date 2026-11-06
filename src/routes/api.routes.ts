import { Router } from "express";
import departmentRoutes from "../modules/departments/department.routes.js";
import employeeRoutes from "../modules/employees/employee.routes.js";
import contractRoutes from "../modules/contracts/contract.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";

const router = Router();

router.use("/departments", departmentRoutes);
router.use("/employees", employeeRoutes);
router.use("/contracts", contractRoutes);
router.use("/roles", roleRoutes);
router.use("/ai", aiRoutes);

export default router;
