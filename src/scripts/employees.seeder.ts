import { faker } from "@faker-js/faker";
import { createEmployee } from "../modules/employees/employee.service.js";
import Department from "../modules/departments/department.model.js";
import Role from "../modules/roles/role.model.js";
import { seedContractsForEmployee } from "./contracts.seeder.js";

export async function seedEmployees(amount: number) {
    const generatedEmails = new Set<string>();

    const [departments, roles] = await Promise.all([
        Department.find().select("_id"),
        Role.find().select("_id"),
    ]);
    const departmentIds = departments.map((d) => d.id);
    const roleIds = roles.map((r) => r.id);

    while (generatedEmails.size < amount) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const email = faker.internet
            .email({
                firstName,
                lastName,
            })
            .toLowerCase();

        if (generatedEmails.has(email)) {
            continue;
        }

        generatedEmails.add(email);

        const employee = await createEmployee({ firstName, lastName, email });
        await seedContractsForEmployee(employee.id, departmentIds, roleIds);
    }

    console.log(`${amount} employees seeded successfully.`);
}
