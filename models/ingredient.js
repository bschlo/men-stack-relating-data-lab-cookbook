const mongoose = require('mongoose')

const ingredientSchema = mongoose.Schema({
    name: String,
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
