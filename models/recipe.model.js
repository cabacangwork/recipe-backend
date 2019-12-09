const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { 
    type: String, 
    unique: true,
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  dish: { 
    type: String, 
    required: true 
  },
  ingredients: { 
    type: Array, 
    required: true 
  },
  procedures: { 
    type: Array, 
    required: true 
  },
  dateCreated: { 
    type: String, 
    required: true 
  },
  editDate: { 
    type: String, 
    required: true 
  },
  recipeId: {
    type: String,
    required: true
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;