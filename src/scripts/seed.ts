import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import { seedDepartments } from "./departments.seeder.js";
import Department from "../modules/departments/department.model.js";
import Employee from "../modules/employees/employee.model.js";
import { seedEmployees } from "./employees.seeder.js";
import { seedRoles } from "./roles.seeder.js";
import Role from "../modules/roles/role.model.js";

async function seedDatabase() {
    await connectDatabase();
    await Department.deleteMany({});
    await Employee.deleteMany({});
    await Role.deleteMany({});
    await seedDepartments();
    await seedRoles(20);
    await seedEmployees(20);
}
seedDatabase()
    .catch((error: unknown) => {
        console.error("Seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
