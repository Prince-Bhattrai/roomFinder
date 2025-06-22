import app from "../app.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()


mongoose.connect(process.env.URI).then(()=>{
    console.log("Db connected successfully")
    app.listen(process.env.PORT,()=>{
        console.log("App is running....")
    })
}).catch((err)=>{
    console.log("Error occoured ",err)
})