import { Reciepe } from "../Model/Reciepe.js";


export const getReciepe = async (req, res) => {
    try {
        let reciepe = await Reciepe.find()
        res.json({ message: 'This is your all Reciepe', reciepe, success: true })
    }
    catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}

export const addReciepe = async (req, res) => {
    const { name, description, ingredients, cook_time,img,fat,carbs,protein,category,multiple_img } = req.body
    try {
        let reciepe = await Reciepe.create({ name, description, ingredients, cook_time,img,fat,carbs,protein ,category,multiple_img});
        res.json({ message: 'Reciepe Added Successfully', reciepe, success: true })
    }
    catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}

export const getReciepeById = async (req, res) => {
    const id = req.params.id
    try {
        let reciepe = await Reciepe.find({ _id: id })
        res.json({ message: 'These is your Reciepe', reciepe, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}

export const deleteReciepeById = async (req, res) => {
    const id = req.params.id
    try {
        let reciepe = await Reciepe.findByIdAndDelete(id)
        if (!reciepe) return res.json({ message: "Invalid Id", success: false })
        res.json({ message: 'Reciepe Has Been Deleted', reciepe, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}

export const editReciepeById = async (req, res) => {
    const id = req.params.id
    try {
        let reciepe = await Reciepe.findByIdAndUpdate(id, req.body, { new: true })
        if (!reciepe) return res.json({ message: "Invalid Id", success: false })
        res.json({ message: 'Reciepe Has Been Updated', reciepe, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}