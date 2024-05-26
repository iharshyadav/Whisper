import express from "express"
import { dbConnect } from "./database/dbConfig.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"

const dot = dotenv.config();


const port  = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user',userRouter);
app.use('/chat',chatRouter);

app.listen(port,()=>{
    dbConnect();
    console.log(`server is running on port ${port}`)
})