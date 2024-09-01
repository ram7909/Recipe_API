import mongoose from 'mongoose'

const feedBackShema = new mongoose.Schema({
    name:{type:String,require:true},
    phone:{type:Number,require:true},
    email:{type:String,require:true},
    message :{type:String,require:true},
})

export const FeedBack  = mongoose.model("feedback",feedBackShema)