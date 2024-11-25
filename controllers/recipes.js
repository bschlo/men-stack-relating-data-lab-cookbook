// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const allRecipes = await Recipe.find({})
    res.render('recipes/index.ejs', { recipes: allRecipes}); 
  });
  
router.get('/new', async (req, res) => {    
    const ingredients = await Ingredient.find()
    res.render('recipes/new.ejs', { ingredients })
})

router.get('/:recipeId', async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.recipeId).populate('ingredients')
    res.render("recipes/show.ejs", { recipe: foundRecipe})
})

router.get('/:recipeId/edit', async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    const ingredients = await Ingredient.find()
    res.render('recipes/edit.ejs', { recipe: foundRecipe, ingredients})
})

router.post('/', async (req, res) => {
try {
    const currentUser = req.session.user
    req.body.owner = currentUser._id 
    await Recipe.create(req.body)
    res.redirect('/recipes')
} catch (error) {
    console.error(error)
}    
})

router.put('/:recipeId', async (req, res) => {
    const id = req.params.recipeId
    const updateData = req.body
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData)
    res.redirect("/recipes")
})

router.delete('/:recipeId', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.redirect('/recipes')
})

module.exports = router;
