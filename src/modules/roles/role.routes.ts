import { Router } from "express";
import { createRoleSchema } from "./role.dto.js";
import { validateBody } from "../../middleware/validate.js";
import { createRole } from "./role.controller.js";

const router = Router();

router.post("/", validateBody(createRoleSchema), createRole);

export default router;
