import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { isValidObjectId } from "mongoose";

export function validateBody(schema: ZodType): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }

        req.body = result.data;
        next();
    };
}

export function validateQuery(schema: ZodType): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({
                message: "Invalid query parameters",
                errors: result.error.issues,
            });
            return;
        }

        res.locals.validatedQuery = result.data;
        next();
    };
}

export const validateObjectId =
    (...paramNames: string[]): RequestHandler =>
    (req, res, next) => {
        for (const name of paramNames) {
            if (!isValidObjectId(req.params[name])) {
                return res.status(400).json({ message: `Invalid ${name}` });
            }
        }
        next();
    };
