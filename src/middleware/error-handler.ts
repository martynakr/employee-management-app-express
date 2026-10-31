import type { ErrorRequestHandler } from "express";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err.code === 11000) {
        res.status(409).json({
            message: "A record with this value already exists",
        });
        return;
    }

    if (err instanceof NotFoundError) {
        res.status(404).json({
            message: err.message,
        });
    }

    if (err instanceof ValidationError) {
        res.status(400).json({
            message: err.message,
            errors: err.errors,
        });
    }

    res.status(500).json({
        message: "Internal server error",
    });
};
