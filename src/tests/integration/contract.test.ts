import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";

describe("Contracts endpoint", () => {
    describe("POST /employees/:employeeId/contracts", () => {
        const employeeDto = {
            firstName: "Test",
            lastName: "Employee",
            email: "test.employee@test.com",
        };
        let employeeId: string;
        let departmentId: string;
        let roleId: string;
        const createContractDto = () => ({
            contractType: "FIXED_TERM",
            employmentBasis: "FULL_TIME",
            hoursPerWeek: 38,
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            salary: 80000,
            departmentId,
            roleId,
        });
        beforeEach(async () => {
            const employeeResponse = await request(app)
                .post("/api/employees")
                .send(employeeDto);
            employeeId = employeeResponse.body._id;
            const departmentResponse = await request(app)
                .post("/api/departments")
                .send({ name: "Engineering" });
            departmentId = departmentResponse.body._id;
            const roleResponse = await request(app)
                .post("/api/roles")
                .send({ name: "Software Developer", departmentId });
            roleId = roleResponse.body._id;
        });
        it("should create a contract if valid dto is provided and no overlapping contract exists", async () => {
            const contractDto = createContractDto();
            const response = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response.status).toBe(201);
            expect(response.body.employeeId).toBe(employeeId);
            expect(response.body.contractType).toBe("FIXED_TERM");
            expect(response.body.employmentBasis).toBe("FULL_TIME");
            expect(response.body.hoursPerWeek).toBe(38);
            expect(response.body.salary).toBe(80000);
        });
        it("should return 404 if employee with given id does not exist", async () => {
            const nonExistentEmployeeId = "111111111111111111111111";
            const response = await request(app)
                .post(`/api/employees/${nonExistentEmployeeId}/contracts`)
                .send(createContractDto());
            expect(response.status).toBe(404);
        });
        it("should return 400 if employee id is invalid", async () => {
            const response = await request(app)
                .post("/api/employees/invalid-id/contracts")
                .send(createContractDto());
            expect(response.status).toBe(400);
        });
        it("should return 400 if department does not exist", async () => {
            const contractDto = {
                ...createContractDto(),
                departmentId: "111111111111111111111111",
            };
            const response = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation failed");
            expect(response.body.errors.departmentId).toBe(
                "Department does not exist",
            );
        });
        it("should return 400 if role does not exist", async () => {
            const contractDto = {
                ...createContractDto(),
                roleId: "111111111111111111111111",
            };
            const response = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation failed");
            expect(response.body.errors.roleId).toBe("Role does not exist");
        });
        it("should return 400 if end date is before start date", async () => {
            const contractDto = {
                ...createContractDto(),
                startDate: "2026-12-31",
                endDate: "2026-01-01",
            };
            const response = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("should return 400 if end date is equal to start date", async () => {
            const contractDto = {
                ...createContractDto(),
                startDate: "2026-01-01",
                endDate: "2026-01-01",
            };
            const response = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response.status).toBe(400);
        });
        it("should create a contract without an end date", async () => {
            const contractDto = {
                ...createContractDto(),
                endDate: null,
            };
            const response = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response.status).toBe(201);
            expect(response.body.endDate).toBeNull();
        });
        it("should return 400 if employee already has an overlapping contract", async () => {
            const contractDto = createContractDto();
            const response1 = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(contractDto);
            expect(response1.status).toBe(201);
            const overlappingContractDto = {
                ...contractDto,
                startDate: "2026-06-01",
                endDate: "2027-06-01",
            };
            const response2 = await request(app)
                .post(`/api/employees/${employeeId}/contracts`)
                .send(overlappingContractDto);
            expect(response2.status).toBe(400);
        });
    });
});
