import { Schema } from "mongoose";

interface IUser {
    employee: Schema.Types.ObjectId;
    password: string;
    role: "ADMIN" | "EMPLOYEE";
}

const userSchema = new Schema({
    employee: {},
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
    },
});
