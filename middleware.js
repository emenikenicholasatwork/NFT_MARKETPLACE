const express = require("express");
const cors = require("cors");

const nftRouter = require("./app/api/routes/nftRouter");
const userRouter = require("./app/api/routes/userRouter");
const app = express();
app.use(cors());
app.use(""), cors();
app.use("/api/v1/NFTs", nftRouter);
app.use("/api/v1/user", userRouter);
export function middleware(request) {
  console.log("middleware is working fine...");
}
