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

export async function seedDepartments() {
    for (const name of departmentNames) {
        await Department.create({ name });
    }

    console.log(`${departmentNames.length} departments seeded successfully.`);
}
