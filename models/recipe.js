const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema ({
    name: {
        type: String, 
        required: true,
    },
    instructions: {
        type: String,
        required: false,
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" ,
        required: true,
    },
    ingredients: {
        type: [mongoose.Schema.Types.ObjectId ],
        ref: "Ingredient",
        required: true
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;