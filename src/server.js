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
};
// add to config or enums file eventually
var categories = ["Produce", "Canned Goods", "Snacks", "Beverages", 
  "Frozen", "Cereal", "Pasta", "Bread \& Baked Goods","Dairy \& Eggs","Meat \& Seafood","Miscellaneous"];
var statuses = ["Available","Reserved"];

var mongoURI = "mongodb://"+dbconfig.user+":"+dbconfig.psw+"@ds141631.mlab.com:41631/food-bank-matcher";
mongoose.connect(mongoURI, {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,
  // sets the delay between every retry (milliseconds)
  reconnectInterval: 1000 
});

var db = mongoose.connection;
db.on('error', function(err) {
  console.error('MongoDB connection error:', err);
  connectFailed = true;
});

//now we should configure the APi to use bodyParser and look for JSON data in the body
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove caching so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

function isSurplusItemValid(body) {
  return body && body.foodBankName && body.itemName 
  && body.quantity && body.categories && (body.categories.length != 0) 
  && (body.categories[0] != '') && categories.includes(body.categories[0])
  && body.status && statuses.includes(body.status);
}

router.route('/updateSurplus')
  .put(function(req, res) {
    if (connectFailed) res.send({errorType:"DB error"});
    if (!req.body.waitlistUserIds && (req.body.reservedUserId === null) && !isSurplusItemValid(req.body)) {
        console.log('err: missing/invalid parameters');
        res.send({error: "Missing/invalid parameters"});
        return;
    } else if (req.body.status && !statuses.includes(req.body.status)) {
      console.log('err: Invalid status parameter');
      res.send({error: "Invalid status parameter"});
      return;
    }
    var id = req.body.id;
    var item = {
      foodBankName: req.body.foodBankName, 
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      categories: req.body.categories,
      status: req.body.status,
      waitlistUserIds: req.body.waitlistUserIds,
      reservedUserId: req.body.reservedUserId
    }
    let upsertItem = {};
    for (var key in item) {
      if (item.hasOwnProperty(key) && item[key] !== undefined) {
        upsertItem[key] = item[key];
      }
    }
    if (!id) {
      id = mongoose.Types.ObjectId();
    }
    SurplusItem.findOneAndUpdate({_id: id}, upsertItem, {
      upsert:true,
      new:true
    }, function(err, results) {
      if (err) {
        console.log('Error adding item:');
        console.log(err);
        res.send({error: "DB error"});
        return;
      }
      console.log("updateSurplus result: ", results);
      res.json(results);
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
        res.json(items);
      });
    }
  });

app.use('/api', router);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});