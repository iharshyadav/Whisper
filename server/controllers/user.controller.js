import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { cookieOption, sendToken } from "../utils/features.js";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

export const login = async (req,res,next) =>{
    
  const {username,password} = req.body;

  const user = await User.findOne({username}).select("+password");

  if(!user){
    return next(new Error("Invalid Username or Password",404))
  }

  const matchPassword = await bcrypt.compare(password,user.password);

  if(!matchPassword){
    return next(new ErrorHandler("Invalid Username or Password",404))
  }

  sendToken(res,user,200,"user loggedIn successfully");
    
}


export const register = tryCatch (async (req,res) =>{
    // console.log(req.body)
    const {
        name,
        username,
        password,
        bio,
        avatar
    } = req.body;

    const { public_id, url } = avatar;
   if(!name || !username || !password || !avatar || !bio){
    console.log("Please fill all the fields of the form")
}

const user = await User.findOne({username});

if(user){
    console.log("User already exists")
    return;
}

const hashedPassword = await bcrypt.hash(password,10);

const saveUser = await User.create({
    name,
    username,
    password : hashedPassword,
    avatar,
    bio
})


if(!saveUser){
    console.log("user not saved")
    return;
}

await sendToken(res, saveUser, 201, "User created");

// console.log(saveUser);
})

export const userProfile = tryCatch (async (req,res) =>{
  
  const user = await User.findById(req.userID);
  // console.log(user);
  res.status(200).json({
    success:true,
    message:"User data retrived successfully",
    data:user,
  })
})

export const logout = tryCatch (async (req,res,next) =>{

  return res
  .status(200)
  .cookie("access-token","",{...cookieOption,maxAge:0})
  .json({
    success:true,
    message:"logged out successfully",
  })
})

export const searchUser = tryCatch (async (req,res,next) =>{

  const { name } = req.query;

  return res
         .status(200)
         .json({
          success:true,
          data:name,
         })
})