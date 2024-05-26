const errorMiddleware = (err,req,res,next) =>{
    err.message ||="Internal server error";
    err.statusCode ||= 500;

    return res.status(err.statusCode).json({
        status : false,
        message:err.message,
    })
}

const tryCatch = (passedFunction) => async (req,res,next) => {
    try {
        await passedFunction(req,res,next);
    } catch (error) {
        next(error)
    }
};

export { errorMiddleware , tryCatch }