var express = require('express');
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/GMapDB';

const difLat = 0.03;
const difLong = 0.03;

MongoClient.connect(url, (err, db) => {
	console.log("Connected correctly to DB");
	let collection = db.collection('myCollection');
	
	router.post('/get', function(req, res, next) {
		let pos = req.body.position;
		let lLat = parseFloat(pos.latitude) - difLat;
		let hLat = parseFloat(pos.latitude) + difLat;
		let lLong = parseFloat(pos.longitude) - difLat;
		let hLong = parseFloat(pos.longitude) + difLat;
		try {
			collection.find({
				"position.longitude" : {$gte:lLong},
				"position.latitude" : {$gte:lLat}
			}).toArray((err, docs) => {
			res.send(docs);
		});
		} catch (err) {
			res.send({message: 'error'});
		}
	});

	router.post('/post', function(req, res, next) {
		let val = req.body;
		val.expireAt = new Date(new Date().getTime() + val.ExpiredTime * 1000 * 60);
		try {
			collection.insertOne(val, (err, res) => {
				if (err) console.log(err);
			});
			res.send({message: 'success'});
		} catch (err) {
			res.send({message: 'error'});
		}
	});
});

module.exports = router;
