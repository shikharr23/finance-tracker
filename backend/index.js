import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
//routes
import authRoute from "./routes/auth.js";
import transRouter from "./routes/transaction.js";

// endpoints

app.use("/api/auth", authRoute);
app.use("/api/transaction", transRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT} and DB connected`);
  });
}

main();
