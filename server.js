const express = require("express");
const app = express();
const cors = require("cors")
const port = 3001;
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/user', userRouter)

try{
    mongoose.connect(process.env.DATABASE_STRING).then(() => {
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    });
}catch(error){
    console.error(`ERROR: ${error.message}`);
    process.exit(1)
}