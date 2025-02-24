import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// user count
export const userCount = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ usersCount: count });
  } catch (err) {
    throw err;
  }
};

//get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};
