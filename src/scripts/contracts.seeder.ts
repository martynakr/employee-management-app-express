import { faker } from "@faker-js/faker";
import { createContractForEmployee } from "../modules/contracts/contract.service.js";

export async function seedContractsForEmployee(
    employeeId: string,
    departmentIds: string[],
    roleIds: string[],
) {
    const firstStart = faker.date.past({ years: 4 });
    const firstEnd = faker.date.between({
        from: firstStart,
        to: new Date(),
    });

    const secondStart = new Date(firstEnd);
    secondStart.setDate(secondStart.getDate() + 1);

    const contracts = [
        {
            contractType: "FIXED_TERM",
            startDate: firstStart,
            endDate: firstEnd,
        },
        {
            contractType: "ONGOING",
            startDate: secondStart,
            endDate: null,
        },
    ] as const;

    for (const c of contracts) {
        await createContractForEmployee(employeeId, {
            ...c,
            employmentBasis: faker.helpers.arrayElement([
                "FULL_TIME",
                "PART_TIME",
                "CASUAL",
            ]),
            hoursPerWeek: faker.number.int({ min: 1, max: 38 }),
            salary: faker.number.int({ min: 50000, max: 150000 }),
            departmentId: faker.helpers.arrayElement(departmentIds),
            roleId: faker.helpers.arrayElement(roleIds),
        });
    }
}
