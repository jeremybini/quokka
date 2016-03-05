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
            password: 'potus',
            admin: true
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function (categories) {

    var products = [
        {
            title: 'Howling Houndstooth',
            description: 'This classic houndstooth print will never go out of style. With these matching sweaters, you and your dog will be fashion icons!',
            price: 3499,
            photoUrl: '/images/UJ1982_2.jpg',
            categories: [categories[0]],
            stock: 24
        },
        {
            title: 'Kitten Mittons',
            description: 'Is your cat making TOO MUCH NOISE all the time? Is your cat constantly stomping around driving you crazy? Is your cat clawing at your furnitures? Kitten Mittons are great for cats (and humans!) that are one legged, fat, skinny, or an in-between.',
            price: 54929,
            photoUrl: '/images/catsocks.jpg',
            categories: [categories[1]],
            stock: 11
        },
        {
            title: 'LuluDog',
            description: 'Get fit in style with your dog. Breaking a sweat in matching spandex makes any exercise fun!',
            price: 23099,
            photoUrl: '/images/718471.jpg',
            categories: [categories[0]],
            stock: 18
        },
                {
            title: 'Cute Holiday Pajamas',
            description: 'Jingle all the way! Pajamas in a fun holiday print for you and your dog',
            price: 23485,
            categories: [categories[0]],
            photoUrl: 'https://s-media-cache-ak0.pinimg.com/564x/e8/ce/d6/e8ced6909d5c7985fd4406526fd84a4d.jpg',
            stock: 21
        },
        {
          title: 'Cozy Cat Sweater',
          description: 'This cozy sweater will make you want to stay indoors with your cat all day!',
          price: 1750,
          categories: [categories[1]],
          photoUrl: 'http://i.imgur.com/tqYiAHnl.jpg',
          stock: 12
        },
        {
          title: 'Fun Holiday Onesie',
          description: 'Your holidays will always be happy with these fun matching pajamas for you and your dog',
          price: 23933,
          categories: [categories[0]],
          photoUrl: 'http://lovelace-media.imgix.net/uploads/519/398324f0-7cd2-0133-9f07-0af7184f89fb.jpg?w=670&fit=max&auto=format&q=70',
          stock: 33
        },
        {
          title: 'Cool Tech Hoodie',
          description: 'This cool tech hoodie exudes geek. Hip and low-key, you will love wearing this hoodie with your dog sipping a cortado at your local coffee shop',
          price: 12465,
          categories: [categories[0]],
          photoUrl: 'https://www.rover.com/blog/wp-content/uploads/2014/12/hoodies-900x540.jpg',
          stock: 34
        },
        {
          title: 'Bling Bling',
          description: 'When you need a little bit of bling, these gold sequined outfits will amp up the star factor for you and your dog!',
          price: 9234895,
          categories: [categories[0]],
          photoUrl: 'https://www.rover.com/blog/wp-content/uploads/2014/12/ny-extravagently-dressed-dogs.jpg',
          stock: 15
        },
        {
          title: 'Tuxedos for Man and Dog',
          description: 'On any special occasion, these classy tuxedos will make you and your dog ready to celebrate.',
          price: 1124575,
          categories: [categories[0]],
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/236x/fe/21/d3/fe21d3d2d093bc81da97463a0505c625.jpg',
          stock: 8
        },
        {
          title: 'Bourgeois Argyle Sweaters',
          description: 'Country club style is no longer limited to the country club. You and your dog can look classic and fresh on and off the green with these matching sweaters.',
          price: 61350,
          categories: [categories[0]],
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/564x/a6/f5/8d/a6f58d41609aa6bd0bc54809ad05b2ad.jpg',
          stock: 11
        },
        {
          title: 'Party Time Tutu',
          description: 'Did somebody say "Party!"?? That is all you will hear when you and your dog wear these fun matching tutus. Feathers and pouf have never looked better.',
          price: 1990,
          categories: [categories[0]],
          photoUrl: 'http://swns.com/wp-content/themes/wp-clear/scripts/timthumb.php?src=http://swns.com/wp-content/uploads/21-682x1024.jpg&w=300&h=460&zc=1',
          stock: 22
        },
        {
          title: 'Arrr Pirates T-Shirts',
          description: 'Pirates usually mean trouble, but these cute matching shirts for dog and child mean double trouble!',
          price: 2570,
          categories: [categories[0]],
          photoUrl: 'http://dogmilk.designmilk.netdna-cdn.com/images/2011/10/babawowo3.jpg',
          stock: 26
        },
        {
          title: 'Chic Chevron Sweaters',
          description: 'This handmade crochet sweater with a striking blue and gold pattern radiate elegance and luxury.',
          price: 19575,
          categories: [categories[0]],
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/564x/48/61/43/486143609a711a9720ffddbb6b84d3ed.jpg',
          stock: 29
        },
        {
          title: 'Back in Plaid',
          description: 'Whoever said plaid was out of fashion was wrong. These matching plaid suits for you and your cat make a statement of style and function.',
          price: 15781,
          categories: [categories[1]],
          photoUrl: 'http://mousebreath.com/wp-content/uploads/2013/01/united-bamboo-cat-clothing.jpg',
          stock: 21
        },
        {
          title: 'High Fashion Shift',
          description: 'For the fearless fashionista, this exciting take on the LBD will elevate the style of you and your cat. Strut your stuff right MEOW!',
          price: 15781,
          categories: [categories[1]],
          photoUrl: 'http://mousebreath.com/wp-content/uploads/2013/01/united-bamboo.jpg',
          stock: 28
        }

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
        },
        {
            user: user[1]._id,
            products: [ { product: product[6]._id, quantity: 4, price: 77 } ],
            status: 'Cart'
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
        return Promise.all([seedReviews(users, products), seedOrders(users, products)]);
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));   
        process.kill(0);})
        .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
