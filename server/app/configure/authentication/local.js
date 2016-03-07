'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

module.exports = function (app) {

    var findAndSetCart = function(user, sessionID) {
        return Order.findOne({
            status: 'Cart',
            session: sessionID
        })
        .then(order =>{
            if (order) {
                order.session = null;
                order.user = user._id;
                return order.save();
            }
        })
        .then(() =>{
            return user;
        })
        .then(null, function(err) {
            console.log(err);
            next(err);
        });
    }

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    app.post('/signup', function (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            //if the session already had a cart
            //set the order's user equal to the new user;
            return findAndSetCart(user, req.sessionID);
        })
        .then(user => {    
            //log user in and send user.sanitize back
            //req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });
        })
        .then(null, next);        
    });

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

};
