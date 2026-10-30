import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";

describe("Departments endpoint", () => {
    describe("POST /departments", () => {
        it("should create a new department if correct dto is sent", async () => {
            const departmentData = { name: "Engineering" };

            const response = await request(app)
                .post("/api/departments")
                .send(departmentData);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe(departmentData.name);
            expect(response.body._id).toBeDefined();
        });
    });
});
