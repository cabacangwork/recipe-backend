const router = require('express').Router();
let Recipe = require('../models/recipe.model');

// Get All Recipes 
router.get('/recipe-list', (req, res) => {
    Recipe.find().sort({recipeId: -1}).then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))
});

// Get Filtered Recipes
router.get('/list/:filter?', (req, res) => {
    (req.query.filter === 'all')? 
      ( Recipe.find().then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))):
      Recipe.find({dish: req.query.filter}).then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))
});

// Add Recipe
router.post('/add', (req, res) => {
    const { title, description, dish, ingredients, procedures, editDate, dateCreated, recipeId } = req.body;
    const newRecipe = new Recipe({
        title, description, dish, ingredients, procedures, editDate, dateCreated, recipeId
    });

    newRecipe.save()
        .then(() => res.send({msg: 'Recipe Added!'}))
        .catch((err) => res.status(400).send({msg: 'Unable to Save New Recipe!', error: true}))
});

// Get Recipe Details
router.get('/view/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => {
        return res.status(400).send({error: true, msg: 'Unable to Find Recipe'})
    });
});

// Delete Recipe
router.delete('/:id', (req,res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.send({msg: 'Recipe Deleted'}))
        .catch((err) => res.status(400).send({msg: 'Unable to Delete'}))
})

// Edit Recipe
router.post('/update/:id', (req,res) => {
    const { title, description, dish, ingredients, procedures, editDate } = req.body;

    Recipe.findByIdAndUpdate(req.params.id, {
        title, description, dish, ingredients, procedures, editDate
    }).then(() => res.send({msg: 'Recipe Updated!'}))
    .catch(err => res.status(400).send({msg: 'Unable to Find Recipe'}));
});

module.exports = router;