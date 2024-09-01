import mongoose from "mongoose";

const reciepeSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    ingredients: { type: Array, require: true },
    cook_time: { type: String, require: true },
    img: { type: String, require: true },
    multiple_img:{type:Array,require:true},
    fat: { type: Number, require: true },
    carbs: { type: Number, require: true },
    protein: { type: Number, require: true },
    category: { type: String, require: true }
})

export const Reciepe = mongoose.model("reciepe", reciepeSchema)