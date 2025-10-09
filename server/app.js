import express from 'express';
import userRouter from "./routes/user.routes.js";
import { configDotenv } from 'dotenv';

const app = express();
const port = 6969;
configDotenv();

app.use("/user",userRouter);
app.get("/",(req,res)=>{
    res.send("Hello")
})



app.listen(port,()=>{
    console.log("server is running on port 6969");
})