const router = require('express').Router();
let Recipe = require('../models/recipe.model');

// Get All Recipes 
router.get('/recipe-list', (req, res) => {
    Recipe.find().sort({recipeId: -1})
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json({msg: 'Unable to Fetch'}))
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
        .then(() => res.send({msg: 'Recipe Added!', success: true}))
        .catch(err => {
            if(err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).json({msg: 'Unable to Save Recipe. Duplicate Recipe Title', success: false})
            }
            return res.status(420).json({msg: 'Unable to Save Recipe.', success: false})
        })
});

// Get Recipe Details
router.get('/view/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json({recipe, success: true}))
    .catch(err => res.status(400).send({success: false, msg: 'Unable to Find Recipe'}));
});

// Delete Recipe
router.delete('/:id', (req,res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.send({msg: 'Recipe Deleted'}))
        .catch(err => res.status(400).send({msg: 'Unable to Delete', error: true}))
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