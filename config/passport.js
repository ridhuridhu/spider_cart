const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        //console.log('User not found!');
        return done(null, false, {
          message: "The email you entered doesn't belong to an account. Please check your email and try again. "
        }); // error, user, message
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          //console.log('Password incorrect! Try again ');
          return done(null, false, {
            message: 'Sorry, your password was incorrect. Please double-check your password.'
          });
        }
      });
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}