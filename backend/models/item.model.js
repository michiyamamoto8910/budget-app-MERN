const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    category: {type: String, required: true },
    description: { type: String},
    price: { type: Number, required: true},
    date: { type: Date, required: true},
},{
    timestamps: true,

})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;