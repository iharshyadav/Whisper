import express from "express"
import { login, logout, register, searchUser, userProfile } from "../controllers/user.controller.js";
import { multerUpload, singleAvatar } from "../middlewares/multer.js";
import { errorMiddleware } from "../middlewares/error.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post('/signUp',singleAvatar,register);
app.post('/login', login ,errorMiddleware);

// from here authentication is required to access the route

app.use(isAuthenticated)
app.get('/userProfile',userProfile);
app.get('/logout',logout);
app.get('/searchUser',searchUser)

export default app;
