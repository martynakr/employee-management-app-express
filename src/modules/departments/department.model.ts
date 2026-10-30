import { Schema, model } from "mongoose";
const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
    },
    { timestamps: true },
);

const Department = model("Department", departmentSchema);

export default Department;
