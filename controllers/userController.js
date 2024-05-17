const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forward-proto"] === "https",
  });

  //remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token: {
      data: {
        user,
      },
    },
  });
};

exports.signUp = async (req, res, next) => {
  try{
    const newUser = await User.create({
      email: req.body.email
    });
    createSendToken(newUser, 201, req, res);
  }catch(error){
    console.log(`Error: ${error}`)
  }
};

exports.login = async (req, res, next) => {
  try{

    console.log(req.body);
    if (req.body == undefined) {
      res.send("body is undefined").status(200);
    }
    const { email, password } = req.body;
  
    // 1) check if email exist
    if (!email) {
      res.status(400).json({
        status: "fail",
        message: "Account does not exits",
      });
    }
  
    // 2) check if details correct
    const user = await User.findOne({ email }).select("+password");
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "fail",
        message: "Incorrect details",
      });
    }
  
    // 3) if everything ok, return token
    createSendToken(user, 200, req, res);
  }catch(error){
    console.log(`Error: ${error}`)
  }
};
