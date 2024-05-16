const express = require("express");
const authController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signUp);
userRouter.post("/login", authController.login);

module.exports = userRouter;
