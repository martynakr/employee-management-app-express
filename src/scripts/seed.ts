import "dotenv/config";
import mongoose from "mongoose";

import { connectDatabase } from "../config/database.js";
import Department from "../modules/departments/department.model.js";

const departmentNames: string[] = [
    "Engineering",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
    "Customer Support",
    "Sales",
    "Legal",
];

async function seedDepartments() {
    await connectDatabase();

    const departmentCount = await Department.countDocuments();

    if (departmentCount > 0) {
        console.log("Departments collection is not empty. Skipping seed.");
        return;
    }

    for (const name of departmentNames) {
        await Department.create({ name });
    }

    console.log(`${departmentNames.length} departments seeded successfully.`);
}

seedDepartments()
    .catch((error: unknown) => {
        console.error("Department seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
