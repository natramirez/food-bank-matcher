const FoodBank = require('../../models/FoodBank');

module.exports = (app) => {

    app.get('/api/foodBanks', (req, res, next) => {
        FoodBank.find()
        .exec()
        .then((postRecord) => res.json(postRecord))
        .catch((err) => next(err));
    });

       app.post('/api/foodBanks/:foodBankName/:itemName/:quantity/:category/addDonation', function (req, res, next) {
        var foodBank = new FoodBank();

        foodBank.foodbank_name = sanitize(req.params.name)
        postRecord.address = sanitize(req.params.address)
        postRecord.type = sanitize(req.params.type)
        postRecord.city = sanitize(req.params.city)
        postRecord.state = sanitize(req.params.state)
        postRecord.zip = sanitize(req.params.zip)
        postRecord.post_title = sanitize(req.params.title)
        postRecord.image_src = `/assets/thumbs/${imageFile.filename}.jpg`
        postRecord.location_lat = sanitize(req.params.lat)
        postRecord.location_lng = sanitize(req.params.lng)
        postRecord.status = 'Unverified'
        postRecord.post_id = (Math.floor(Math.random() * 10000000)).toString()


        mv(imageFile.path, `../client/public/assets/thumbs/${imageFile.filename}.jpg`, function(err) {
            if (err) {
                console.log(err)
            }
        })

        postRecord.save()
        .then(() => res.json(postRecord))
        .catch((err) => next(err));
    });
};