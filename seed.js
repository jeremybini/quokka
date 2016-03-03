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
                {
            title: 'Cute Holiday Pajamas',
            description: 'Jingle all the way! Pajamas in a fun holiday print for you and your dog',
            price: 85,
            categories: [categories[0], categories[2]],
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/564x/e8/ce/d6/e8ced6909d5c7985fd4406526fd84a4d.jpg'
        },
        {
          title: 'Cozy Cat Sweater',
          description: 'This cozy sweater will make you want to stay indoors with your cat all day!',
          price: 750,
          categories: [categories[1], categories[2]],
          photoUrl: 'http://i.imgur.com/tqYiAHnl.jpg'
        },
        {
          title: 'Fun Holiday Onesie',
          description: 'Your holidays will always be happy with these fun matching pajamas for you and your dog',
          price: 933,
          categories: [categories[0], categories[2]],
          photoUrl: 'http://lovelace-media.imgix.net/uploads/519/398324f0-7cd2-0133-9f07-0af7184f89fb.jpg?w=670&fit=max&auto=format&q=70'
        },
        {
          title: 'Cool Tech Hoodie',
          description: 'This cool tech hoodie exudes geek. Hip and low-key, you will love wearing this hoodie with your dog sipping a cortado at your local coffee shop',
          price: 65,
          categories: [categories[0], categories[2]],
          photoUrl: 'https://www.rover.com/blog/wp-content/uploads/2014/12/hoodies-900x540.jpg'
        },
        {
          title: 'Bling Bling',
          description: 'When you need a little bit of bling, these gold sequined outfits will amp up the star factor for you and your dog!',
          price: 895,
          categories: [categories[0], categories[2]],
          photoUrl: 'https://www.rover.com/blog/wp-content/uploads/2014/12/ny-extravagently-dressed-dogs.jpg'
        },
        {
          title: 'Tuxedos for Man and Dog',
          description: 'On any special occasion, these classy tuxedos will make you and your dog ready to celebrate.',
          price: 4575,
          categories: [categories[0], categories[2]],
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/236x/fe/21/d3/fe21d3d2d093bc81da97463a0505c625.jpg'
        },
        {
          title: 'Bourgeois Argyle Sweaters',
          description: 'Country club style is no longer limited to the country club. You and your dog can look classic and fresh on and off the green with these matching sweaters.',
          price: 650,
          categories: [categories[0], categories[2]],
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/564x/a6/f5/8d/a6f58d41609aa6bd0bc54809ad05b2ad.jpg'
        },
        {
          title: 'Party Time Tutu',
          description: 'Did somebody say "Party!"?? That is all you will hear when you and your dog wear these fun matching tutus. Feathers and pouf have never looked better.',
          price: 1990,
          categories: [categories[0], categories[2]],
          photoUrl: 'http://swns.com/wp-content/themes/wp-clear/scripts/timthumb.php?src=http://swns.com/wp-content/uploads/21-682x1024.jpg&w=300&h=460&zc=1'
        },
        {
          title: 'Arrr Pirates T-Shirts',
          description: 'Pirates usually mean trouble, but these cute matching shirts for dog and child mean double trouble!',
          price: 570,
          categories: [categories[0], categories[2]],
          photoUrl: 'http://dogmilk.designmilk.netdna-cdn.com/images/2011/10/babawowo3.jpg'
        },
        {
          title: 'Chic Chevron Sweaters',
          description: 'This handmade crochet sweater with a striking blue and gold pattern radiate elegance and luxury.',
          price: 19575,
          categories: [categories[0], categories[2]],
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/564x/48/61/43/486143609a711a9720ffddbb6b84d3ed.jpg'
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
