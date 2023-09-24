import mongoose from "mongoose";

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({ 
    usersMessages:[
        {
            userEmail:String,
            messages:Array
        }
    ]
})

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);