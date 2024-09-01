import { User } from '../Model/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getAllUser = async (req, res) => {
    try {
        let user = await User.find();
        res.json({ message: 'These is Your All Users', user, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        let user = await User.findByIdAndDelete(id)
        res.json({ message: 'User Has Been Deleted', user, success: true })

    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}

export const register = async (req, res) => {
    const { name, email, phone, gender, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) return res.json({ message: "User Already Exist", success: false })
        let hashPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, phone, gender, password: hashPassword })
        res.json({ message: 'Register Sucessfully', user, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Exist", success: false });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect Password', success: false });
        }

        // Create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '365d'
        });

        res.status(200).json({ message: `Welcome ${user.name}`, token, success: true });

    } catch (error) {
        console.error(error); // Log error details for debugging
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

export const profile = async (req, res) => {
    const token = req.header("auth")

    if (!token) return res.json({ message: "Login First", success: false });

    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    const id = decoded.userId

    const user = await User.findById(id);
    req.user = user
    const { name, email, phone, gender, isAdmin } = user
    res.json({ message: `welcome ${name}`, name, email, phone, gender, isAdmin, success: true })
}

export const updateUser = async (req, res) => {
    let { id } = req.params
    let { isAdmin } = req.body
    try {
        if (typeof isAdmin !== 'boolean') return res.json({ message: "Invalid Value" })
        let user = await User.findByIdAndUpdate(id, { isAdmin }, { new: true })
        if (!user) return res.json({ message: "User Not Found", success: false })
        res.json({ message: "User Updated", user, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false })
    }
}