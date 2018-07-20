
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SurplusItemSchema = new mongoose.Schema({
    foodBankName: {type: String},
    itemName:{type: String},
    quantity: {type: Number},
    perishable: {type: Boolean},
    expirationDate: {type: String},
    categories: [{ type: String }]

}, { collection : 'SurplusItems' });

module.exports = mongoose.model('SurplusItem', SurplusItemSchema);