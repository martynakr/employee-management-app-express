import { Router } from "express";
import { validateBody } from "../../middleware/validate.js";
import { chatSchema } from "./ai.dto.js";
import { chat } from "./ai.controller.js";

const router = Router();

router.post("/", validateBody(chatSchema), chat);

export default router;
