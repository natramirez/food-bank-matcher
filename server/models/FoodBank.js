const FoodBankSchema = new mongoose.Schema({
    foodbank_name: {
        type: String,
        default: ''
    },
    location_lat: {
        type: String,
        default: ''
    },
    location_lng: {
        type: String,
        default: ''
    },
    phone_number: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    surplus_items: [  {
           itemName:{type: String},
           quantity: {type: Number},
           perishable: {type: Boolean},
           expirationDate: {type: String},
           categories: [{ type: String

           }]
       }],
    
    image_src: {
        type: String,
        default: ''
    },
    img_alt: {
        type: String,
        default: ''
    },
    img_height: {
        type: String,
        default: ''
    },
    img_width: {
        type: String,
        default: ''
    }

});

module.exports = mongoose.model('FoodBank', FoodBankSchema);

