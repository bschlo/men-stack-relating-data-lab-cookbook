// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab

router.get("/", async (req, res) => {
try {
    const allIngredients = await Ingredient.find({})
    res.render("ingredients/index.ejs", { ingredients: allIngredients})
} catch (error) {
    console.error(error)
}
})

router.post('/', async (req, res) => {
    try {
        const currentUser = req.session.user
        req.body.owner = currentUser._id    
        await Ingredient.create(req.body)
        res.redirect('/ingredients')
    } catch (error) {
        console.error(error)
    }    
    })
module.exports = router;
