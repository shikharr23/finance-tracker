import "dotenv/config";
import User from "../models/user.js";

import express from "express";
import bcrypt from "bcrypt";
const authRoute = express.Router();
import jwt from "jsonwebtoken";
import { json, z } from "zod";

const signupSchema = z.object({
  firstName: z.string(),
  userName: z.string(),
  password: z.string().min(5),
});

const signinSchema = z.object({
  userName: z.string(),
  password: z.string().min(5),
});

authRoute.post("/signup", async (req, res) => {
  try {
    const parsedResult = signupSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(400).json({
        msg: "Invalid inputs.",
      });
    }
    const { firstName, userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    const newUser = await User.create({
      firstName,
      userName,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET); // userid is needed  to identify the user making request

    res.json({
      msg: "New user created",
      token,
      user: { firstName, userName },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

authRoute.post("/signin", async (req, res) => {
  try {
    const parsedResult = signinSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(400).json({
        msg: "Invalid Inputs",
      });
    }
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(400).json({ msg: "User does not exists" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

    res.json({
      msg: "Login successfully",
      token,
      user: {firstName: existingUser.firstName, userName: existingUser.userName}
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error." });
  }
});

export default authRoute;
