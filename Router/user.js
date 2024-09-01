import express from 'express'
import { deleteUser, getAllUser, login, profile, register, updateUser } from '../Controller/user.js';

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/profile',profile)
router.get('/users',getAllUser)
router.delete('/delete/:id',deleteUser)
router.put('/edit/:id',updateUser)

export default router