import express from 'express'
import bodyParse from 'express'
import mongoose from 'mongoose';
import reciepeRouter from './Router/reciepe.js';
import userRouter from './Router/user.js'
import favouriteRouter from './Router/favourite.js'
import cors from 'cors'
import { config } from 'dotenv';
import dotenv from 'dotenv';
import feedbackRouter from './Router/feedback.js'
const app = express()


app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// config({path:'.env'})
dotenv.config();
app.use(bodyParse.json())
 
// console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.use('/reciepe', reciepeRouter)
app.use('/user', userRouter)
app.use('/favourite',favouriteRouter)
app.use('/feedback',feedbackRouter)


const port = 1100;

mongoose
    .connect(process.env.Mongo_URL, {
        dbName: 'Reciepe'
    })
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(() => console.log("Internal Server Error"))

app.listen(port, () => console.log(`Server is running on Port ${port}`))
