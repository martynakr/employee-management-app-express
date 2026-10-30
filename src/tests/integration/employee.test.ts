import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";

describe("Employees endpoint", () => {
    describe("POST /employees", () => {
        it("should create a new employee if correct dto is sent", async () => {
            const employeeDto = {
                firstName: "Test",
                lastName: "Employee",
                email: "test.employee@test.com",
            };

            const response = await request(app)
                .post("/api/employees")
                .send(employeeDto);

            expect(response.status).toBe(201);
            expect(response.body.workEmail).toBe(
                "test.employee@employee-management.com",
            );
            expect(response.body._id).toBeDefined();
        });

        it("should return 400 if first name is missing", async () => {
            const employeeDto = {
                lastName: "Lastname",
                email: "test.lastname@test.com",
            };

            const response = await request(app)
                .post("/api/employees")
                .send(employeeDto);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation failed");
            expect(response.body.errors).toEqual([
                {
                    field: "firstName",
                    message:
                        "Invalid input: expected string, received undefined",
                },
            ]);
        });
        it("should return 400 if email is not a valid", async () => {
            const employeeDto = {
                firstName: "John",
                lastName: "Smith",
                email: "john.smithtest.com",
            };

            const response = await request(app)
                .post("/api/employees")
                .send(employeeDto);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation failed");

            expect(response.body.errors).toEqual([
                {
                    field: "email",
                    message: "Invalid email address",
                },
            ]);
        });

        it("should return 400 with all error details if multiple fields are incorrect", async () => {
            const employeeDto = {
                firstName: "",
                lastName: "Smith",
                email: "john.smithtest.com",
            };

            const response = await request(app)
                .post("/api/employees")
                .send(employeeDto);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation failed");
            expect(response.body.errors).toContainEqual({
                field: "firstName",
                message: "First name is required",
            });
            expect(response.body.errors).toContainEqual({
                field: "email",
                message: "Invalid email address",
            });
        });

        it("should return 409 if email is already used", async () => {
            const employeeDto = {
                firstName: "New",
                lastName: "Employee",
                email: "new.employee@test.com",
            };

            const response1 = await request(app)
                .post("/api/employees")
                .send(employeeDto);
            expect(response1.status).toBe(201);

            const response2 = await request(app)
                .post("/api/employees")
                .send(employeeDto);

            expect(response2.status).toBe(409);
            expect(response2.body.message).toBe(
                "A record with this value already exists",
            );
        });
    });

    describe("GET /employees", () => {
        beforeEach(async () => {
            await request(app).post("/api/employees").send({
                firstName: "John",
                lastName: "Smith",
                email: "john.smith@test.com",
            });

            await request(app).post("/api/employees").send({
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@test.com",
            });

            await request(app).post("/api/employees").send({
                firstName: "Michael",
                lastName: "Johnson",
                email: "michael.johnson@test.com",
            });
        });

        it("should return all employees when no query parameters are provided", async () => {
            const response = await request(app).get("/api/employees");

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(3);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        firstName: "John",
                        lastName: "Smith",
                    }),
                    expect.objectContaining({
                        firstName: "Jane",
                        lastName: "Smith",
                    }),
                    expect.objectContaining({
                        firstName: "Michael",
                        lastName: "Johnson",
                    }),
                ]),
            );
        });

        it("should filter employees by first name", async () => {
            const response = await request(app)
                .get("/api/employees")
                .query({ firstName: "John" });

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toEqual(
                expect.objectContaining({
                    firstName: "John",
                    lastName: "Smith",
                }),
            );
        });

        it("should filter employees by last name", async () => {
            const response = await request(app)
                .get("/api/employees")
                .query({ lastName: "Smith" });

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });

        it("should filter employees by both first name and last name", async () => {
            const response = await request(app).get("/api/employees").query({
                firstName: "John",
                lastName: "Smith",
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toEqual(
                expect.objectContaining({
                    firstName: "John",
                    lastName: "Smith",
                }),
            );
        });

        it("should perform case-insensitive partial matching", async () => {
            const response = await request(app)
                .get("/api/employees")
                .query({ firstName: "joH" });

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ firstName: "John" }),
                    expect.objectContaining({ firstName: "Michael" }),
                ]),
            );
        });

        it("should return an empty array if no employees match the filters", async () => {
            const response = await request(app)
                .get("/api/employees")
                .query({ firstName: "Nonexistent" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});
