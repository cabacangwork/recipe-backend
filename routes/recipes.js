const router = require('express').Router();
let Recipe = require('../models/recipe.model');

// Get All Recipes 
router.get('/recipe-list', (req, res) => {
    Recipe.find().then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))
});

// Get Filtered Recipes
router.get('/list/:filter?', (req, res) => {
    (req.query.filter === 'all')? 
      ( Recipe.find().then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))):
      Recipe.find({dish: req.query.filter}).then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))
});

// Add Recipe
router.post('/add', (req, res) => {
    const { title, description, dish, ingredients, procedures, editDate, dateCreated } = req.body;
    const newRecipe = new Recipe({
        title, description, dish, ingredients, procedures, editDate, dateCreated
    });

    newRecipe.save()
        .then(() => res.send({msg: 'Recipe Added!'}))
        .catch((err) => res.status(400).send('Unable to Save New Recipe'))
});

// Get Recipe Details
router.get('/view/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).send({error: true}));
});

// Delete Recipe
router.delete('/:id', (req,res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.send({msg: 'Recipe Deleted'}))
        .catch((err) => res.status(400).send('Unable to Delete'))
})

// Edit Recipe
router.post('/update/:id', (req,res) => {
    const { title, description, dish, ingredients, procedures, editDate } = req.body;

    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.title = title,
            recipe.description = description,
            recipe.dish = dish,
            recipe.ingredients = ingredients,
            recipe.procedures = procedures,
            recipe.editDate = editDate

            recipe.save()
                .then(() => res.send({msg: 'Recipe Updated!'}))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;