import jwt from "jsonwebtoken"
import { ErrorHandler } from "../utils/utility.js"
import { tryCatch } from "./error.js"
export const isAuthenticated = tryCatch ( async (req,res,next) =>{
 
    const token = req.cookies["access-token"]

    if(!token){
        return next(new ErrorHandler("Please login to access this route", 401));
    }

    const data = jwt.verify(token , process.env.JWT_SECRET);

    // from here I'm accessing userId and I can Use across any function without exporting to get access of the user details.
    req.userID = data._id;

    next();

})