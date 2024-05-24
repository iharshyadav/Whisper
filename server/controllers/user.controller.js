import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";

export const login = async (req,res) =>{
    
  const {username,password} = req.body;

  const user = await User.findOne({username}).select("+password");

  if(!user){
    return res.status(201).json({message : "Inavlid Username"});
  }

  const matchPassword = await bcrypt.compare(password,user.password);

  if(!matchPassword){
    return res.status(201).json({
        message : "Inavlid Password"
    })
  }

  sendToken(res,user,200,"user loggedIn successfully");
    
}


export const register = async (req,res) =>{
    try {
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

    } catch (error) {
        console.log(error)
    }

}