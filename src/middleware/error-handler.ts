import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);

    if (err.code === 11000) {
        res.status(409).json({
            message: "A record with this value already exists",
        });
        return;
    }

    res.status(500).json({
        message: "Internal server error",
    });
};
