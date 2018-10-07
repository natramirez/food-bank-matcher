
var mongoose = require('mongoose');

const SurplusItemSchema = new mongoose.Schema({
    foodBankName: {type: String},
    itemName:{type: String},
    quantity: {type: String},
    perishable: {type: Boolean},
    expirationDate: {type: String},
    categories: [{ type: String }],
    status: {type: String},
    reservedUserId: {type: String},
    waitlistUserIds: [{type: String}]

}, { collection : 'SurplusItems' });

module.exports = mongoose.model('SurplusItem', SurplusItemSchema);