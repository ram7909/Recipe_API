import { Favourite } from "../Model/Favourite.js";

export const addToFavourite = async (req, res) => {
    const { recipeId, name, img, description } = req.body;
    const userId = req.user;
    try {
        let favourite = await Favourite.findOne({ userId });
        if (!favourite) {
            favourite = new Favourite({ userId, items: [] });
        }

        const itemExists = favourite.items.some(item => item.recipeId.toString() === recipeId);
        if (itemExists) {
            return res.json({ message: "Recipe Already In Favourite", success: false });
        }

        favourite.items.push({ recipeId, name, img, description });
        await favourite.save();
        res.json({ message: "Recipe Added To Favourite", favourite, success: true });
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false });
    }
};


// get all user favourite recipe
export const userFavourite = async (req, res) => {
    const userId = req.user
    try {
        let favourite = await Favourite.findOne({ userId })
        if (!favourite) return res.json({ message: "Favourite not Found", success: false })
        res.json({ message: "These is Your Favourite Recipe", favourite, success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false });
    }
}

// remove favourite recipe
export const removeFavourite = async (req, res) => {
    const recipeId = req.params.recipeId
    const userId = req.user
    try {
        let favourite = await Favourite.findOne({ userId })
        if (!favourite) return res.json({ message: "Favourite not Found", success: false })

        favourite.items = favourite.items.filter((item) => item.recipeId.toString() != recipeId)

        await favourite.save()
        res.json({ message: "Recipe Removed", favourite,success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false });
    }
}

// clear favourite page
export const clearFavourite = async (req, res) => {
    const userId = req.user
    try {
        let favourite = await Favourite.findOne({ userId })
        if (!favourite){
            favourite = new Favourite({items:[]})
        } else{
            favourite.items = [];
        }

        await favourite.save()
        res.json({ message: "Cleared", success: true })
    } catch (error) {
        res.json({ message: 'Internal Server Error', success: false });
    }
}
