import express from "express";
import { createSession, getAllSessions, getOldSessions, getRelatedSessions, getSingleSession, sessionsToday, sessionsTomorrow, getActiveSessions } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/createsession", createSession);

router.get("/getrelatedsessions/:id", getRelatedSessions);

router.get("/allsessions", getAllSessions);

router.get("/sessionstoday", sessionsToday);

router.get("/sessionstomorrow", sessionsTomorrow);

router.get("/getsinglesession/:id", getSingleSession);

router.get("/getoldsessions/:id", getOldSessions);

router.get("/getactivesessions/:id", getActiveSessions);

export default router;