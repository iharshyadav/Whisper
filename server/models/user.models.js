import mongoose from "mongoose";


const { Schema, model } = mongoose;
const models = mongoose.models;

const userSchema = new Schema ({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    bio: {
        type: String,
        required: true,
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    avatar : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        }
    }
},
{
    timestamps : true,
}
)


export const User = models.User || model('User',userSchema);