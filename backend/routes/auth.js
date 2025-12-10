import "dotenv/config";

import express from "express";
const authRoute = express.Router();

import User from "../models/user.js";

import { z } from "zod";
import jwt from "jsonwebtoken";

const signupSchema = z.object({
  firstName: z.string(),
  userName: z.string(),
  password: z.string().min(5),
});

const signinSchema = z.object({
  userName: z.string(),
  password: z.string().min(5),
});

authRoute.post("/auth/signup", async (req, res) => {

});

authRoute.post("auth/signin", async (req, res) => {

});





export default authRoute;