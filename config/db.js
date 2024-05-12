const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_STRING, ()=>{
            console.log("Connected to MongoDB");
        })
    }catch(error){
        console.error(`ERROR:   ${error.message}`);
        process.exit(1);
    }
};
