import express from "express";
import { addToFavourite, clearFavourite, removeFavourite, userFavourite } from "../Controller/favourite.js";
import { Authenticated } from "../Middleware/auth.js";
const router = express.Router();

// add recipe To favourite
router.post('/add',Authenticated,addToFavourite)

// get user favourite recipe
router.get('/get',Authenticated,userFavourite)

// remove recipe to favourite
router.delete('/remove/:recipeId',Authenticated,removeFavourite)

// clear favourite
router.delete('/clear',Authenticated,clearFavourite)

export default router