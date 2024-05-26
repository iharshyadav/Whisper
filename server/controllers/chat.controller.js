import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.models.js"
import { emitEvent } from "../utils/features.js";
import {
    ALERT,
    REFETCH_CHATS,
  } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";

const newGroup = tryCatch( async (req,res,next) => {
    const {
        name,
        members
    } = req.body;

    const allMembers = [...members,req.userID];


    if(members.length < 2){
        return next(new ErrorHandler(401,"Add Atleast 3 members before creating the group"));
    }

     await Chat.create({
        name,
        groupChat: true,
        creator: req.userID,
        members: allMembers,
    })

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
        success: true,
        message: "Group Created",
      });
})

const getMyChats = tryCatch(async (req,res,next) =>{

    const chats = await Chat.find({members: req.userID}).populate(
        "members",
        "name avatar"
    );

    const transformedChats = chats.map(({_id, name, members, groupChat }) =>{
        
        const otherMembers = getOtherMembers(members, req.userID);

        return {
            _id,
            groupChat,
            avatar : groupChat ? members.slice(0,3).map(({avatar}) => avatar.url) : [otherMembers.avatar.url],
            name : groupChat ? name : otherMembers.name,

// This code snippet is filtering out a specific member from an array of members based on a condition.
// It uses the reduce method on the members array to iterate over each member. For each member, it checks if the _id of the member
//  does not match the _id of the req.user. If the condition is met, it pushes the _id of that member into the prev array.
// Finally, it returns the prev array which contains the _id of all members except the one that matches req.user.
            members:  members.reduce((prev, curr) => {
                if (curr._id.toString() !== req.userID.toString()) {
                  prev.push(curr._id);
                }
                return prev;
              }, []),
        }
    })
    
    return res.status(200).json({
        success: true,
        chats: transformedChats,
      });
})

export {
    newGroup,
    getMyChats
}