import { Router } from "express";
import departmentRoutes from "../modules/departments/department.routes.js";

const router = Router();

router.use("/departments", departmentRoutes);

export default router;
