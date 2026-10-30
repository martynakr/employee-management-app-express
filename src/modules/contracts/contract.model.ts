import { Schema, model } from "mongoose";

const contractSchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true,
        },
        contractType: {
            type: String,
            enum: [],
            required: true,
        },
        employmentBasis: {
            type: String,
            enum: [],
            required: true,
        },
        hoursPerWeek: {
            type: Number,
            required: true,
            min: 1,
            max: 38,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            default: null,
        },
        salary: {
            type: Number,
            required: true,
            min: 0,
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

contractSchema.virtual("active").get(function () {
    const now = new Date();

    return (
        this.startDate != null &&
        this.startDate <= now &&
        (this.endDate == null || this.endDate >= now)
    );
});

const Contract = model("Contract", contractSchema);
export default Contract;
