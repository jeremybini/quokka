// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('Carts', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('/api/cart', function () {
		agent.session = 'abcd';

		var p1, p2, p3, user, order;

		beforeEach(function (done) {
			User.create({
				email: 'me@email.com',
				password: 'me'
			}, function (err, u) {
					if (err) return done(err);
					user = u;
					done();
			})
		});

		beforeEach(function (done) {
			var a = Product.create({
					title: "Dog Pants",
			  	description: 'Pants for you and your dog',
			  	price: 32.99,
				  photoUrl: 'http://dogpants.com'
			})
			.then(function(p) {
				p1 = p;
			})

			var b = Product.create({
					title: "Cat Pants",
			  	description: 'Pants for you and your cat',
			  	price: 1000,
				  photoUrl: 'http://catpants.com'
			})
			.then(function(p) {
				p2 = p;
			})

			var c = Product.create({
					title: "Fish Pants",
			  	description: 'Pants for you and your Fish',
			  	price: 99999,
				  photoUrl: 'http://Fishpants.com'
			})
			.then(function(p) {
				p3 = p;
			})

			Promise.all([a,b,c])
			.then(function(){
				done()
			})
			.then(null, done);
		});

		beforeEach(function (done) {
			Order.create({
				products: [{
					product: p1,
					quantity: 2,
				}],
				status: 'Cart',
				session: agent.id
			}, function (err, o) {
				if (err) return done(err);
				order = o;
				done();
			})
		});

		xit('creates a cart if one doesn\'t exist', function (done) {
			agent
			.post('/api/cart/add')
			.send({
					productId: p1._id
			})
			.expect(204)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('Cat Pants');
				createdProduct = res.body;
				done();
			});
		});
		
		it('adds a product', function (done) {
			agent
			.post('/api/cart/add')
			.send({
					productId: p1._id
			})
			.expect(204)
			.end(function (err, res) {
				console.log("ADD RESPONSE", res);
				if (err) return done(err);
				// expect(res.body.title).to.equal('Cat Pants');
				// createdProduct = res.body;
				done();
			});
		});
		
		it('removes a product', function (done) {
			agent
			.get('/api/products/' + product._id)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal(product.title);
				done();
			});
		});

		it('updates and order', function (done) {
			agent
			.get('/api/books/123abcnotamongoid')
			.expect(404)
			.end(done);
		});
		
	});
});