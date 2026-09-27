require("dotenv").config({
    path: "./.env"
});

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");


// =====================================================
// Database Setup
// =====================================================

beforeAll(async () => {

    await mongoose.connect(
        process.env.MONGODB_URI
    );

}, 15000);


afterAll(async () => {

    await mongoose.connection.close();

}, 15000);


// =====================================================
// Health API Test
// =====================================================

describe("Health API", () => {

    test("GET /api/health should return 200", async () => {

        const response = await request(app)
            .get("/api/health");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

    });

});


// =====================================================
// Signup API Tests
// =====================================================

describe("Signup API", () => {

    test("should create a new user", async () => {

        const email =
            `test-${Date.now()}@example.com`;

        const response = await request(app)
            .post("/signup")
            .send({

                username: "testuser",

                email: email,

                password: "testpassword"

            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.token).toBeDefined();

    });


    test("should reject duplicate email", async () => {

        const email =
            `duplicate-${Date.now()}@example.com`;

        // First signup
        await request(app)
            .post("/signup")
            .send({

                username: "testuser",

                email: email,

                password: "testpassword"

            });


        // Second signup using same email
        const response = await request(app)
            .post("/signup")
            .send({

                username: "anotheruser",

                email: email,

                password: "anotherpassword"

            });


        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

    });

});