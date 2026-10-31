import { faker } from "@faker-js/faker";
import Role from "../modules/roles/role.model.js";

export async function seedRoles(amount: number) {
    for (let i = 0; i < amount; i++) {
        const name = faker.person.jobTitle();
        await Role.create({ name });
    }

    console.log(`${amount}  seeded successfully.`);
}
