import { createServer } from "../../utils/server.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Doctor API Endpoints", () => {
    let mongoServer;
    let app;

    beforeAll(async () => {
         mongoServer = await MongoMemoryServer.create();
         const uri = mongoServer.getUri();
 
         await mongoose.connect(uri);
 
         app = createServer();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe("GET /api/doctor/specificdoctor/:id", () => {
        it("should return 404 if the doctor does not exist", async () => {
            const doctorId = "12345";

            const response = await supertest(app)
                .get(`/api/doctor/specificdoctor/${doctorId}`)
                .expect(404);

            expect(response.body).toHaveProperty("success", false);
            /* expect(response.body).toHaveProperty("message", "Doctor not found"); */
        });
    });

    describe("GET /api/doctor/getdoctorcount", () => {
        it("should return 200 if the request is a success", async () => {
            const response = await supertest(app)
                .get("/api/doctor/getdoctorcount")
                .expect(200);
        })
    });

    describe("GET /api/doctor/alldoctors", () => {
        it("should return 200 if the request is a success", async () => {
            const response = await supertest(app)
                .get("/api/doctor/alldoctors")
                .expect(200);
        })
    })
});