import jwt from 'jsonwebtoken'
import { User } from '../Model/User.js';

export const Authenticated = async (req, res, next) => {
    const token = req.header("auth")
    if (!token) return res.json({ message: "Login First", success: false });

    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    const id = decoded.userId
    let user = await User.findById(id)

    if (!user) return res.json({ message: "User Not Exist" })

    req.user = user
    
    next();
}