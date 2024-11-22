// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
    const allRecipes = await Recipe.find({})
    res.render('recipes/index.ejs', { recipes: allRecipes}); 
  });
  
router.get('/new', async (req, res) => {    
    res.render('recipes/new.ejs')
})

router.get('/:recipeId', async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    res.render("recipes/show.ejs", { recipe: foundRecipe})
})

router.post('/', async (req, res) => {
try {
    const currentUser = req.session.user
    console.log(currentUser)
    req.body.owner = currentUser._id    
    await Recipe.create(req.body)
    res.redirect('/recipes')
} catch (error) {
    console.error(error)
}    
})

router.put('/:recipeId', async (req, res) => {
    
})

router.delete('/:recipeId', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.redirect('/recipes')
})

module.exports = router;
