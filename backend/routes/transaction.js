import "dotenv/config";
import express from "express";
const transRouter = express.Router();

import { z } from "zod";
import jwt from "jsonwebtoken";

const transactionSchema = z.object({
  amount: z.number(),
  type: z.string(),
  category: z.string(),
});
// get all transaction
transRouter.get("/transactions", async (req, res) => {});
//create a transaction
transRouter.post("/transactions", async (req, res) => {});
// update
transRouter.put("/transactions/:id", async (req, res) => {});
//delete
transRouter.delete("/transactions/:id", async (req, res) => {});


export default transRouter;