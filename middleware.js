const express = require("express")
const cors = require("cors");
const app = express();
app.use(cors());
// app.use(""), cors();

export function middleware(request) {
  console.log("middleware is working fine...");
}
