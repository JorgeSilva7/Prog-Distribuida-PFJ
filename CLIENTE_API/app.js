var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var config = require('./config');
var jwt = require('jsonwebtoken')

module.exports = app;

mongoose.connect(config.database, { useNewUrlParser: true }, function (err, res) {
	if (err) {
		console.log('Error al conectar a la Base de datos. ' + err);
	}
});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var ClientController = require('./controllers/Client.js');
var User = require('./models/User.js')(app, mongoose);
var AuthController = require('./controllers/AuthController.js');

//Api routes
var smartHome = express.Router();
var auth = express.Router();

var userModel = mongoose.model('User');

smartHome.use(async function (req, res, next) {
	var authorization = req.headers['authorization'];

	if (!authorization) return res.status(401).send({ token: false, message: 'No token provided.' });
	
	var token = authorization.split(' ');
	if (!token[1]) return res.status(401).send({ token: false, message: 'No token provided.' });

	jwt.verify(token[1], config.secret, function (err, decoded) {
		if (err) return res.status(500).send({ token: false, message: 'Failed to authenticate token.' });

		userModel.findById(decoded.id,
			function (err, user) {
				if (err) return res.status(500).send("There was a problem finding the user.");
				if (!user) return res.status(404).send("No user found.");
				req.user = user;
				next(); // add this line
			});
	});
});

auth.route('/login')
	.post(AuthController.loginUser);
auth.route('/').
	post(AuthController.addUser);

smartHome.route('/users')
	.get(AuthController.listUsers);
smartHome.route('/init')
	.get(ClientController.intialize);
smartHome.route('/encenderled')
	.get(ClientController.encenderLampara);
smartHome.route('/apagarled')
	.get(ClientController.apagarLampara);

app.use('/smarthome', smartHome);
app.use('/auth', auth);


app.listen(3000, function () {
	console.log("Servidor Iniciado en http://localhost:3000");
});


