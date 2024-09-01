import mongoose from "mongoose";

const favouriteItemSchema = new mongoose.Schema({
    recipeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Recipe",
        require:true
    },
    name:{type:String,require:true},
    img:{type:String,require:true},
    description:{type:String,require:true}
})


const favouriteShema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    items:[favouriteItemSchema]
})

export const Favourite = mongoose.model("favourite",favouriteShema)