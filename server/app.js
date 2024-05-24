import express from "express"
import userRouter from "./routes/user.routes.js"
import { dbConnect } from "./database/dbConfig.js";
import dotenv from "dotenv"

const dot = dotenv.config();
// console.log(dot.error);
// console.log(dot.parsed);


const port  = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user',userRouter);

app.listen(port,()=>{
    dbConnect();
    console.log(`server is running on port ${port}`)
})