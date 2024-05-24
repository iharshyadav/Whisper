import { Schema, Types, model, models } from "mongoose";


const messagesSchema = new Schema ({
    sender : {
        type : Types.ObjectId,
        ref : "User",
        required : true,
    },
    content : {
        type : String,
    },
    chat : {
        type : Types.ObjectId,
        ref : "Chat",
        required : true,
    },
    attachements : [
        {
            public_id : {
                type : String,
                required : true,
            },
            url : {
                type : String,
                required : true,
            }
        }
    ]
},
{
    timestamps : true,
}
)


export const Messages = models.Messages || model('Messages',messagesSchema);