import { faker } from "@faker-js/faker";
import { createEmployee } from "../modules/employees/employee.service.js";

export async function seedEmployees(amount: number) {
    const generatedEmails = new Set<string>();

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

        await createEmployee({
            firstName,
            lastName,
            email,
        });
    }

    console.log(`${amount} employees seeded successfully.`);
}
