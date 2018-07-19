const User = require('../../models/User');
const passport = require("passport");
const LocalStrategy   = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require('connect-flash');

var sanitize = require('mongo-sanitize');


//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());


module.exports = (app) => {
    app.get('/api/user', (req, res, next) => {
        User.find()
        .exec()
        .then((user) => res.json(user))
        .catch((err) => next(err));
    });



    app.post('/api/registeredUsers', function (req, res, next) {

      if (req.body.email && req.body.username && req.body.password && req.body.first_name && req.body.last_name && req.body.city && req.body.state && req.body.zip) {

         var userData = {
            email: sanitize(req.body.email),
            username: sanitize(req.body.username),
            password: sanitize(req.body.password),
            first_name: sanitize(req.body.first_name),
            last_name: sanitize(req.body.last_name),
            city: sanitize(req.body.city),
            state: sanitize(req.body.state),
            zip: sanitize(req.body.zip)
           }



          User.create(userData, function (error, user) {
           if (error) {
             return next(error);
             } else {
          req.session.userId = user._id;
          //req.flash('User Registered')
              return res.redirect('/');
              }
            });
       }

      else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(sanitize(req.body.logemail), sanitize(req.body.logpassword), function (error, user) {
          if (error || !user)
          {
           var err = new Error('Wrong email or password.');
           err.status = 401;
          return next(err);
          }

         else
          {
             req.session.userId = user._id;
             //req.flash('User Logged In')
             return res.redirect('/');
         }
      });
     }


    else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
     }
});



//     app.post('/api/user/:username/:email/:password/:city/:state/:zip/:firstName/:lastName/addUser', function (req, res, next) {
//         var currentUser = new User();

//         currentUser.username = req.params.username
//         currentUser.password = req.params.password
//         currentUser.email = req.params.email
//         currentUser.city = req.params.city
//         currentUser.state = req.params.state
//         currentUser.zip = req.params.zip
//         currentUser.last_name = req.params.lastName
//         currentUser.first_name = req.params.firstName

//         console.log(currentUser.username + ' ' + currentUser.password + ' ' + currentUser.email + ' ' + currentUser.city + ' ' + currentUser.state + ' ' + currentUser.zip + ' ' + currentUser.last_name + ' ' + currentUser.first_name)

//         currentUser.save()
//         .then(() => res.json(currentUser))
//         .catch((err) => next(err));
//         res.redirect('/');

// //          passport.authenticate("local")(req, res, function(){
// //             res.redirect("/"); //once the user sign up
// // });
//     });

    // app.get('/api/user/:username/findUser', (req, res, next) => {
    //     User.find( { "username": new RegExp( req.params.username ), "password": new RegExp( req.params.password )} )
    //     .exec()
    //     .then((user) => res.json(user))
    //     .catch((err) => next(err));
    // });


//     app.post('/api/user/:username/:password/signinUser', function (req, res, next) {

//         // you might like to do a database look-up or something more scalable here
//          User.authenticate(req.params.username, req.params.password, function (error, user) {
//           if (error || !user)
//           {
//            var err = new Error('Wrong email or password.');
//            err.status = 401;
//           return next(err);
//           }

//          else
//           {
//              req.session.userId = user._id;
//              return res.redirect('/');
//          }
// });

// });

    app.get('/api/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});




//     passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.getUserByUsername(username, function (err, user) {
//             if (err) throw err;
//             if (!user) {
//                 return done(null, false, { message: 'Unknown User' });
//             }

//             User.comparePassword(password, user.password, function (err, isMatch) {
//                 if (err) throw err;
//                 if (isMatch) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Invalid password' });
//                 }
//             });
//         });
// }));


//     passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.getUserById(id, function (err, user) {
//         done(err, user);
//     });
// });


};
