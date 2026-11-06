import type { Request, Response, NextFunction } from "express";
import { askKnowledgeBase } from "./ai.service.js";

export const chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question } = req.body;

        const result = await askKnowledgeBase(question);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
