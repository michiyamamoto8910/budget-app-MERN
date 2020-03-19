const router = require('express').Router();
let Category = require('../models/category.model');

//get all category from database
router.route('/').get((req,res) => {
    Category.find()
    .then(categories => res.json(categories))
    .catch(error => req.status(400).json('Error' + error));
});

//save a category in database
router.route('/add').post((req,res) =>{
    const category = req.body.category;
    const newCategory = new Category({category});

    newCategory.save()
    .then(() => res.json('Category added!'))
    .catch(error => res.status(400).res.json('Error: ' + error));
});

module.exports = router;