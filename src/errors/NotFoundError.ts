import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
    constructor(message: string) {
        super("Entity not found");
        this.name = "NotFoundError";
        this.message = message;
    }
}
