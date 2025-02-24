import { createServer } from "../../utils/server.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("User API Endpoints", () => {
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

    describe("GET /api/user/getallusers", () => {
        it("Should return 200 if it is a success", async () => {
            const response = await supertest(app)
                .get("/api/user/getallusers")
                .expect(200);
        })
    })

    describe("GET /api/user/usercount", () => {
        it("Should return 200 if it is a success", async () => {
            const response = await supertest(app)
                .get("/api/user/usercount")
                .expect(200)
        })
    })
})