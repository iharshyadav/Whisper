import express from "express"
import { login, register } from "../controllers/user.controller.js";
import { multerUpload, singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post('/signUp',singleAvatar,register);
app.post('/login', login );


export default app;
