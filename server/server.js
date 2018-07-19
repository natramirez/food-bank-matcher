const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');
const LocalStrategy = require("passport-local");
const passportLocalMongoose   = require("passport-local-mongoose");
const passport = require("passport");
const expressValidator = require('express-validator');
const flash = require('connect-flash');
//const session = require('express-session')
const fileUpload = require('express-fileupload');
const cors = require('cors');


const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

var multer = require('multer');

// Configuration
// ================================================================================================

// Set up Mongoose

mongoose.connect("mongodb://localhost:27017/myTestDB", {
  "auth": {"authSource": "admin"},
  "user": "team06Admin",
  "pass": "SealTeam",
  "useMongoClient": true
});
mongoose.Promise = global.Promise;

// mongoose.connect(isDev ? config.db_dev : config.db, {
//   useMongoClient: true,
// });
// mongoose.Promise = global.Promise;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(flash());

app.use(require("express-session")({
      secret:"Hello World, this is a session",
      resave: false,
      saveUninitialized: false
}));

// app.use(require("express-session")({
//       secret:"Hello World, this is a session",
//       resave: false,
//       saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));
//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.use(cors());
  app.use(fileUpload());
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
  app.use(cors());
  app.use(fileUpload());
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
