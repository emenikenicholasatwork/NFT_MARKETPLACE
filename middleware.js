import { NextResponse } from "next/server";
const express = require("express");
const cors = require("cors")
app.use(cors());
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("middleware is working fine")
  return NextResponse.redirect(new URL("/home", request.url));
}