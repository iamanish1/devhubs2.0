import express from 'express';
import userRouter from "./routes/user.routes.js";
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

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

app.use("/user",userRouter);






app.listen(PORT,()=>{
    console.log(`server is running on localhost:${PORT}`);
})