import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:Number,require:true},
    gender:{type:String,require:true},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now}
})

export const User = mongoose.model("user",userSchema)