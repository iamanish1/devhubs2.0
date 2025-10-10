import { configDotenv } from "dotenv"
import mongoose from "mongoose";

configDotenv();
export const  connectMongoDB =async () =>{
    try {
          await  mongoose.connect(`${process.env.MONGO_URI}`);
          console.log("Mongo connected successfully");
    } catch (error) {
        console.log(error);
    }

}