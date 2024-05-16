const express = require("express");
const app = express();
const port = 3001;
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");


// app.use('/user', userRouter)
app.post('/user/login', (req, res)=>{
  console.log(req.data);
  res.send("just testing").status(200)
})

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