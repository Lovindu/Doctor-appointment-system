import Session from "../models/Session.js";
import Doctor from "../models/Doctor.js";

//create session
export const createSession = async (req, res, next) => {
  const doctor = await Doctor.findById(req.body.doctorId);
  if (!doctor) return res.status(403).json({ message: "Doctor not found" });

  const newSession = new Session({
    ...req.body,
    fee: doctor.amountPerPatient,
  });

  try {
    const createdSession = await newSession.save();
    res.status(200).json(createdSession);
  } catch (err) {
    throw err;
  }
};

//get related session
export const getRelatedSessions = async (req, res, next) => {
  try {
    const relatedSessions = await Session.find({ doctorId: req.params.id });
    res.status(200).json(relatedSessions);
  } catch (err) {
    throw err;
  }
};

// get all sessions
export const getAllSessions = async (req, res, next) => {
  try {
      const allSessions = await Session.find();
      res.status(200).json(allSessions);
  } catch(err) {
      throw err;
  }
}


//sessions today
export const sessionsToday = async (req, res, next) => {
  try {
    const startOftheDay = new Date();
    startOftheDay.setUTCHours(0, 0, 0, 0);

    const endOftheDay = new Date();
    endOftheDay.setUTCHours(23, 59, 59, 999);

    const sessions = await Session.find({
      date: { $gte: startOftheDay, $lt: endOftheDay },
    });
    res.status(200).json(sessions);
  } catch (err) {
    throw err;
  }
};

//sessions tomorrow
export const sessionsTomorrow = async (req, res, next) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOftheDay = tomorrow.setUTCHours(0, 0, 0, 0);
    const endOftheDay = tomorrow.setUTCHours(23, 59, 59, 999);

    const sessions = await Session.find({
      date: { $gte: startOftheDay, $lt: endOftheDay },
    });

    res.status(200).json(sessions);
  } catch (err) {
    throw err;
  }
};

//get single session
export const getSingleSession = async (req, res, next) => {
  try {
    const getSession = await Session.findById(req.params.id);

    res.status(200).json(getSession);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

//get old sessions
export const getOldSessions = async (req, res, next) => {
  try {
    const getOld = await Session.countDocuments({
      doctorId: req.params.id,
      status: false,
    });
    res.status(200).json(getOld);
  } catch (err) {
    throw err;
  }
};

//get active sessions
export const getActiveSessions = async (req, res, next) => {
  try {
    const getActive = await Session.countDocuments({
      doctorId: req.params.id,
      status: true,
    });
    res.status(200).json(getActive);
  } catch (err) {
    throw err;
  }
};
