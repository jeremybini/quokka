// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var Review = mongoose.model('Review');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('Products', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('fake app', function () {

		describe('/api', function () {

			describe('products', function () {

				var category, product, review;

					beforeEach(function (done) {
						Category.create({
							name: 'Dog'
						}, function (err, c) {
								if (err) return done(err);
								category = c;
								done();
						})
					});

					beforeEach(function (done) {
						Review.create({
							rating: 5,
							content: 'Great'
						}, function (err, r) {
							if (err) return done(err);
							review = r;
							done();
						});
					});

					beforeEach(function (done) {
						Product.create({
								title: "Dog Pants",
						  	description: 'Pants for you and your dog',
						  	price: 32.99,
							  categories: [category._id],
							  reviews: [review._id],
							  photoUrl: 'http://dogpants.com'
						}, function (err, p) {
							if (err) return done(err);
							product = p;
							done();
						});
					});
				
				it('GET all', function (done) {
					agent
					.get('/api/products')
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body).to.be.instanceof(Array);
						expect(res.body).to.have.length(1);
						done();
					});
				});

				var createdProduct;

				it('POST one', function (done) {
					agent
					.post('/api/products')
					.send({
							title: "Cat Pants",
					  	description: 'Pants for you and your cat',
					  	price: 20.99,
						  categories: [category._id],
						  reviews: [review._id],
						  photoUrl: 'http://catpants.com'
					})
					.expect(201)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body.title).to.equal('Cat Pants');
						createdProduct = res.body;
						done();
					});
				});
				
				it('GET one', function (done) {
					agent
					.get('/api/products/' + product._id)
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body.title).to.equal(product.title);
						done();
					});
				});

				it('GET one that doesn\'t exist', function (done) {
					agent
					.get('/api/books/123abcnotamongoid')
					.expect(404)
					.end(done);
				});
				
				it('PUT one', function (done) {
					agent
					.put('/api/products/' + product._id)
					.send({
						title: 'Cat Suspenders'
					})
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body.title).to.equal('Cat Suspenders');
						done();
					});
				});

				it('PUT one that doesn\'t exist', function (done) {
					agent
					.put('/api/products/123abcnotamongoid')
					.send({title: 'Fake Product'})
					.expect(404)
					.end(done);
				});
				
				it('DELETE one', function (done) {
					agent
					.delete('/api/products/' + product._id)
					.expect(204)
					.end(function (err, res) {
						if (err) return done(err);
						Product.findById(product._id, function (err, p) {
							if (err) return done(err);
							expect(p).to.be.null;
							done();
						});
					});
				});

				it('DELETE one that doesn\'t exist', function (done) {
					agent
					.delete('/api/products/123abcnotamongoid')
					.expect(404)
					.end(done);
				});

				it('GET with query string filter', function (done) {
					agent
					// remember that in query strings %20 means a single whitespace character
					.get('/api/products?category=Dog')
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body).to.be.instanceof(Array);
						expect(res.body).to.have.length(1);
						done();
					});
				});

				it('GET with query string filter that has no results', function (done) {
					agent
					// remember that in query strings %20 means a single whitespace character
					.get('/api/products?category=Cat')
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						expect(res.body).to.be.instanceof(Array);
						expect(res.body).to.have.length(0);
						done();
					});
				});
			});
		});
	});
});