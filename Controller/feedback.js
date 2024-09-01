import { FeedBack } from "../Model/Feedback.js"

export const addFeedback = async (req,res) =>{
    const {name,phone,email,message} = req.body
    try {
        let feedback  = await FeedBack.create({name,phone,email,message})
        res.json({message:"Sent Successfully",feedback,success:true})
    } catch (error) {
        res.json({message:"Internal Server Error",success:false})
    }
}

export const allFeedback = async (req,res) =>{
    try {
        let feedback = await FeedBack.find();
        res.json({message:"These Is Your All Feedback",feedback,success:true})

    } catch (error) {
        res.json({message:"Internal Server Error",success:false})
    }
}