import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
    constructor(public errors: Record<string, string>) {
        super("Validation failed");
        this.name = "ValidationError";
        this.errors = errors;
    }
}
