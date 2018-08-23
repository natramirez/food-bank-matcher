//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
// var FoodBank = require('../model/FoodBank');
var SurplusItem = require('../model/SurplusItem');
var connectFailed = false;
//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up
var port = process.env.PORT || 8080;

// connect to mongodb using mongodb URI
var dbconfig = {
    user:'foodbank',
    psw:'mongofoodbank1',
}
var mongoURI = "mongodb://"+dbconfig.user+":"+dbconfig.psw+"@ds141631.mlab.com:41631/food-bank-matcher";
mongoose.connect(mongoURI, {useMongoClient: true });

var db = mongoose.connection;
db.on('error', function(err) {
  console.error('MongoDB connection error:', err);
  connectFailed = true;
});

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove caching so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /questions route to our /api router
router.route('/updateSurplus')
  //retrieve all questions from the database
  .put(function(req, res) {
    if (connectFailed) res.send({errorType:"DB error"});
    if (!req.body || !req.body.foodBankName || !req.body.itemName 
      || !req.body.quantity || !req.body.categories || req.body.categories.length == 0 
      || req.body.categories[0] == '') {
        console.log('err: missing parameters');
        res.send({error: "Missing parameters"});
        return;
    }
    var foodBankName = req.body.foodBankName;
    var itemName = req.body.itemName;
    var quantity = req.body.quantity;
    var category = req.body.categories;
    var newItem = new SurplusItem({
      foodBankName: foodBankName, 
      itemName: itemName,
      quantity: quantity,
      categories: category
    });
    newItem.save(function(err, results) {
      if (err) {
        console.log('Error adding item:');
        console.log(err);
        res.send({error: "DB error"});
        return;
      }
      console.log("updateSurplus result: ", results);
      res.json("Surplus item successfully added.");
    }); 
  });

router.route('/search')
  .get(function(req, res) {
    if (connectFailed) res.send({'name':'MongoError'});
    if (req.query && (req.query.itemName || req.query.categories)) {
      var catSearchFilter = req.query.categories == "Any" ? '' : `"categories": {"$all" : ["${req.query.categories}"]}`;
      var itemSearchFilter = req.query.itemName ? `"$text": {"$search": "${req.query.itemName}"}` : '';
      var comma = req.query.itemName && req.query.categories ? ',' : '';
      var searchFilter = catSearchFilter == '' ? JSON.parse(`{${itemSearchFilter}}`) : JSON.parse(`{${catSearchFilter}${comma}${itemSearchFilter}}`);
      SurplusItem.find(searchFilter, function(err, items) {
        if (err) {
          console.log('err: ' + err);
          res.send(err);
        }
        console.log("items: ", items);
        res.json(items);
      });
    }
  });
//Use our router configuration when we call /api
app.use('/api', router);

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  // console.log("hereee")
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  // Handle React routing, return all requests to React app
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
}
// app.use(express.static(path.resolve(__dirname, '..', 'build')));

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});