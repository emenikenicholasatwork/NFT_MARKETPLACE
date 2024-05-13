const express = require("express")
const connectDB = require("@/config/db")

const app = express()


app.listen(3001, ()=>{
    connectDB()
})