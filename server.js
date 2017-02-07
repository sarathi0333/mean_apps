var express =  require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname+ "/public"));

app.get('/contactlist', function(req, res) {
	//console.log("get request received ...");

	db.contactlist.find(function(err, data) {
		console.log(data);
		res.json(data);
	})
});

app.post('/contactlist', function(req, res) {
	//console.log(req.body);
	db.contactlist.insert(req.body, function(err, data) {
		res.json(data);
	})
});

app.delete('/contactlist/:id', function(req, res) {
	var id =  req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, data) {
		res.json(data);
	})
})

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, data) {
		res.json(data);
	})
});

app.put('/contactlist/:id', function(req, res) {
	var id= req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: {_id:mongojs.ObjectId(id)},
		update: {
			$set: {
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone 
			}
		},
		new: true 
	}, function(err, data) {
		res.json(data);
	})

});	

app.listen(3000, function() {
	console.log("server running ... listen to port 3000");
})