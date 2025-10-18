import express from 'express';
import userRouter from "./routes/user.routes.js";
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { connectMongoDB } from './database/dbConfig.js';
import projectListingRouter from './routes/ProjectListingRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000
configDotenv();

//*_______________Middlewares starts here ________________//
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);

//*_______________Middlewares starts here ________________//
//?-------------------------------------------------------------
//*_______________Routes starts here ________________//

app.use("/api",userRouter);
app.use("/api",projectListingRouter);
app.get("/",(req,res)=>{
  res.send("server is working");
})





app.listen(PORT,()=>{
    connectMongoDB();
    console.log(`server is running on localhost:${PORT}`);
})