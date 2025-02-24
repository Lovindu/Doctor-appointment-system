import { createServer } from "../../utils/server.js";
import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Session API Endpoints", () => {
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

    describe("GET /api/session/allsessions", () => {
        it("Should return 200 if the request is a success", async () => {
            const response = await supertest(app)
                .get("/api/session/allsessions")
                .expect(200)
        })
    })

    describe("GET /api/session/getsinglesession/:id", () => {
        it("Should return 404 if the session is not there", async () => {
            const sessionId = "123";

            const response = await supertest(app)
                .get(`/api/session/getsinglesession/${sessionId}`)
                .expect(404)
        })
    })

    describe("GET /api/session/sessionstoday", () => {
        it("Should return 200 if there are sessions happening today", async () => {
            const response = await supertest(app)
                .get("/api/session/sessionstoday")
                .expect(200);
        })
    })

});
