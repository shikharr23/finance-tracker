import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    // income or expense
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Transaction", transactionSchema);
