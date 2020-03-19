const router = require('express').Router();
const Item = require('../models/item.model');

// get all item from database
router.route('/').get((req,res) => {
    Item.find()
    .then(items => res.json(items))
    .catch(error => res.status(400).res.json('Error: ' + error));
});

// add an item to database
router.route('/add').post((req,res) => {
    const category = req.body.category;
    const description = req.body.description;
    const price = Number(req.body.price);
    const date = Date.parse(req.body.date);

    const newItem = new Item({
        category,
        description,
        price,
        date,
    });  

    newItem.save()
    .then(() => res.json('Item added'))
    .catch(error => res.status(400).json('Error: ' + error));
})

// find specific item through its id
router.route('/:id').get((req,res) =>{
    Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(error => res.status(400).json('Error: ' + error));
});

// delete specific item through its id
router.route('/:id').delete((req,res) =>{
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted'))
    .catch(error => res.status(400).json('Error: ' + error));
});

// update specific item through its id
router.route('/update/:id').post((req,res) => {
    Item.findById(req.params.id)
    .then(item => {
        item.category = req.body.category;
        item.description = req.body.description;
        item.price = Number(req.body.price);
        item.date = Date.parse(req.body.date);

        item.save()
        .then(() => res.json('Item updated!'))
        .catch(error => res.status(400).json('Error: '+ error));
    })
    .catch(error => res.status(400).json('Error: '+ error));
    
});


module.exports = router;