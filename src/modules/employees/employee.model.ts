import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        workEmail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                const { createdAt, updatedAt, __v, ...rest } =
                    ret as typeof ret & {
                        createdAt?: Date;
                        updatedAt?: Date;
                    };
                return rest;
            },
        },
    },
);

const Employee = model("Employee", employeeSchema);

export default Employee;
