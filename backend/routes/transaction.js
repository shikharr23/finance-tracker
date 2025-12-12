import "dotenv/config";
import express from "express";
import Transaction from "../models/transaction.js";
import authMiddleware from "../middleware/authMiddleware.js";
const transRouter = express.Router();

import { z } from "zod";

transRouter.use(authMiddleware);

const transactionSchema = z.object({
  amount: z.number(),
  type: z.string(),
  category: z.string(),
});

// get all transaction
transRouter.get("/me", async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.userId }); // specific user find
  res.json({
    msg: "Your transaction:",
    transactions,
  });
});

//create a transaction
transRouter.post("/", async (req, res) => {
  const parsedResult = transactionSchema.safeParse(req.body);
  if (!parsedResult.success) {
    return res.status(400).json({ msg: "Invalid Schema" });
  }
  const { amount, type, category } = req.body;
  const newTransaction = await Transaction.create({
    amount,
    type,
    category,
    user: req.user.userId,
  });
  res.json({
    msg: "Transaction made!",
    transaction: newTransaction,
  });
});

// update the whole transaction
transRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const parsedResult = transactionSchema.safeParse(req.body);
  if (!parsedResult.success) {
    return res.status(400).json({ msg: "Invalid Schema" });
  }

  const { amount, type, category } = req.body;
  try {
    const updateTransaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId,
      },
      {
        amount,
        type,
        category,
      },
      {
        new: true,
      }
    );
    if (!updateTransaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.json({
      msg: "Transaction updated as a whole",
      newTransaction: updateTransaction,
    });
  } catch (error) {
    return res.json({ msg: "Server Error" });
  }
});

//update the part u want

transRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const parsedResult = transactionSchema.partial().safeParse(req.body); // for selective updates
  if (!parsedResult.success) {
    return res.status(400).json({ msg: "Invalid Schema" });
  }
  const updates = req.body;

  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId,
      },
      updates,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({
      msg: "Update completed",
      newTransaction: updatedTransaction,
    });
  } catch (error) {
    return res.json({ msg: "Server Error" });
  }
});

//delete
transRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    if (!deletedTransaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.json({
      msg: "Transaction deleted",
      deletedTransaction,
    });
  } catch (error) {
    return res.json({ msg: "Server Error", error });
  }
});

export default transRouter;
