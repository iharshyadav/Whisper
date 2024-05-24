import mongoose from "mongoose";

export const dbConnect = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`databse connected on port : ${connectionInstance.connection.port}`)
    } catch (error) {
        console.error('failed to connect to databse');
    }
}