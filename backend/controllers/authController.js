import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//sign up
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      password: hash,
    });

    // should add jwt authentications here
    const createdUser = await newUser.save();

    const token = jwt.sign(
      { id: createdUser._id, isAdmin: createdUser.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = createdUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(createdUser);
  } catch (err) {
    throw err;
  }
};

//login function with jwt
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return console.log("No user found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return console.log("Wrong password");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    throw err;
  }
};

//update password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return console.log("something went wrong!!");

    const isCurrentPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCurrentPasswordCorrect)
      return console.log("password does not match");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);

    const updatedPassword = await User.findByIdAndUpdate(
      user._id,
      { $set: { password: hash } },
      { new: true }
    );

    res.status(200).json(updatedPassword);
  } catch (err) {
    throw err;
  }
};

//admin login
export const adminLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return console.log("user not found");

    if (user.isAdmin === false)
      return res.status(403).json({ message: "User is not an admin" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "wrong password!" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
