/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Order = Promise.promisifyAll(mongoose.model('Order'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function (categories) {

    var products = [
        {
            title: 'Matching Sweaters',
            description: 'Your dog and you can wear matching sweaters.',
            price: 3499,
            photoUrl: '/images/UJ1982_2.jpg',
            categories: [categories[0], categories[2]]
        },
        {
            title: 'Matching Mittens',
            description: 'Your cat and you can wear matching mittens.',
            price: 5499,
            photoUrl: '/images/catsocks.jpg',
            categories: [categories[1], categories[2]]
        },
        {
            title: 'Matching Mittens',
            description: 'Your cat and you can wear matching mittens.',
            price: 5499,
            photoUrl: '/images/718471.jpg',
            categories: [categories[0], categories[1]]
        },
    ];

    return Product.createAsync(products);

};

var seedReviews = function (user, product) {
  
    var reviews = [
        {
            rating: 4,
            content: 'I love matching my pets.',
            user: user[0]._id,
            product: product[0]._id
        },
        {
            rating: 2,
            content: 'I don\'t know why I have a pet.',
            user: user[1]._id,
            product: product[1]._id
        },

    ];

    return Review.createAsync(reviews);

};

var seedOrders = function (user, product) {
  
    var orders = [
        {
            user: user[0]._id,
            products: [ { product: product[0]._id, quantity: 2, price: 56 } ],
            status: 'Submitted'
        },
        {
            user: user[1]._id,
            products: [ { product: product[1]._id, quantity: 1, price: 33 } ],
            status: 'Processing'
        },
        {
            user: user[0]._id,
            products: [ { product: product[2]._id, quantity: 4, price: 77 } ],
            status: 'Completed'
        }

    ];

    return Order.createAsync(orders);

};

var seedCategories = function () {
  
    var categories = [
        {
            name: "Dogs"
        },
        {
            name: "Cats"
        },
        {
            name: "Other Critters"
        },
    ];

    return Category.createAsync(categories);

};

connectToDb.then(function (db) {
    return db.db.dropDatabase();
}).then(function() {
    return seedCategories();
}).then(function(categories) {
    Promise.all([seedUsers(), seedProducts(categories)])
    .spread(function (users, products) {
        return seedReviews(users, products);
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));   
        process.kill(0);})
        .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
