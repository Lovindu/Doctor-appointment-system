import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res, next) => {
  const newAppointment = new Appointment(req.body);

  try {
    const createdAppointment = await newAppointment.save();

    res.status(200).json(createdAppointment);
  } catch (err) {
    throw err;
  }
};

export const userAppointments = async (req, res, next) => {
  try {
    const relatedAppointments = await Appointment.find({
      userId: req.params.id,
    });

    res.status(200).json(relatedAppointments);
  } catch (err) {
    throw err;
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const allAppointments = await Appointment.find();
    res.status(200).json(allAppointments);
  } catch (err) {
    throw err;
  }
};

// appointment count
export const appointmentCount = async (req, res, next) => {
  try {
    const appointmentCount = await Appointment.countDocuments();
    res.status(200).json({ appointmentsCount: appointmentCount });
  } catch (err) {
    throw err;
  }
};

//delete appointment
export const deleteAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json("appointment has been cancelled");
  } catch (err) {
    res.status(404).status({
      success: false,
      message: err.message,
    });
  }
};
