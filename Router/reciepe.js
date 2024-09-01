import { Router } from "express";
import { addReciepe, deleteReciepeById, editReciepeById, getReciepe, getReciepeById } from "../Controller/reciepe.js";
import { adminAuthentication } from "../Middleware/admin-auth.js";

const router = Router();

router.post('/add',adminAuthentication,addReciepe)

router.get('/get',getReciepe)
 
router.get('/get/:id',getReciepeById)

router.delete('/delete/:id',adminAuthentication,deleteReciepeById)

router.put('/edit/:id',adminAuthentication,editReciepeById)

export default router
