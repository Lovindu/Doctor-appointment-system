import { createServer } from "../../utils/server.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { response } from "express";

describe("Appointment API endpoints", () => {
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

    describe("GET /api/appointment/allappointments", () => {
        it("Should return 200 if the request is a success", async () => {
            const response = await supertest(app)
                .get("/api/appointment/allappointments")
                .expect(200);
        })
    })

    describe("GET /api/appointment/appointmentcount", () => {
        it("Should return 200 if the request is a success", async () => {
            const response = await supertest(app)
                .get("/api/appointment/appointmentcount")
                .expect(200)
        })
    })

    describe("DELETE /api/appointment/deleteappointment/:id", () => {
        it("Should return 404 if the item user looking for delete is not available", async () => {
            const itemId = "1234";

            const response = await supertest(app)
                .get(`/api/appointment/deleteappointment/${itemId}`)
                .expect(404)
        })
    })
})