import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, newGroup } from "../controllers/chat.controller.js";

const app = express.Router();


app.use(isAuthenticated)
app.post('/newGroup',newGroup)
app.post('/mychats',getMyChats)

export default app;
