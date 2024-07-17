import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const port = 3001;
require('dotenv').config();
const userRouter = require("./routes/userRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRouter)

try {
  mongoose.connect(process.env.DATABASE_STRING).then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1)
}