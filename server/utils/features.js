import jwt from "jsonwebtoken"


const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

const sendToken = (res,user,code,message) =>{

  const token = jwt.sign({ _id: user._id } , "process.env.JWT_SECRET");

  return res.status(code).cookie("access-token",token,cookieOption).json({
      success:true,
      message,
  }) 
      
  
}

export { sendToken }