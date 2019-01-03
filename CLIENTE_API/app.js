//Imports
const cors = require('cors');
var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var config = require('./config');
var jwt = require('jsonwebtoken')

module.exports = app;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.options('*', cors());

//MongoDB Configuration
mongoose.connect(config.database, { useNewUrlParser: true }, function (err, res) {
	if (err) {
		console.log('Error al conectar a la Base de datos. ' + err);
	}
});
mongoose.set('useCreateIndex', true);

//Models
require('./models/Device'); //Device Model
require('./models/User'); //User Model

//Controllers
var ClientController = require('./controllers/ClientController.js');
var AuthController = require('./controllers/AuthController.js');
var DeviceController = require('./controllers/DeviceController.js');

//Api routes
var smartHome = express.Router();
var auth = express.Router();

//User Model for JWT
var userModel = mongoose.model('User');

//PROTEGER RUTAS BAJO "SMARTHOME" SOLO A PETICIONES CON JWT
smartHome.use(async function (req, res, next) {

	var authorization = req.headers['authorization'];

	if (!authorization) return res.status(401).send({ error: 'No se proporciono una token' });

	var token = authorization.split(' ');
	if (!token[1]) return res.status(401).send({ error: 'No se proporciono una token' });

	jwt.verify(token[1], config.secret, function (err, decoded) {
		if (err) return res.status(500).send({ error: 'Error con el checkeo de la token' });

		userModel.findById(decoded.id,
			function (err, user) {
				if (err) return res.status(500).send({ error: 'No se encontro un usuario asociado a la sesion' });
				if (!user) return res.status(404).send({ error: "Token no es valida como sesion" });
				req.user = user;
				
				next();
			});
	});
});

//RUTAS LOGIN Y REGISTRAR USUARIO
auth.route('/login')
	.post(AuthController.loginUser);
auth.route('/register').
	post(AuthController.addUser);

/** 
 * RUTAS PROTEGIDAS BAJO JWT
 **/
//RUTAS DEVICE (Dispositivo)
smartHome.route('/device/:id')
	.get(DeviceController.getDevice)
	.put(DeviceController.editDevice)
	.delete(DeviceController.deleteDevice);
smartHome.route('/device')
	.post(DeviceController.addDevice);
smartHome.route('/devices')
	.get(DeviceController.listUserDevices);
smartHome.route('/sensordevices')
	.get(DeviceController.listUserSensorDevices);
smartHome.route('/actuatordevices')
	.get(DeviceController.listUserActuatorDevices);

//RUTAS USER (Usuario)
smartHome.route('/users')
	.get(AuthController.listUsers);

//RUTAS CLIENTE SMART HOME
smartHome.route('/encender/:id/:idDorm/:idIn')
	.get(ClientController.encenderActuador);
smartHome.route('/apagar/:id/:idDorm/:idIn')
	.get(ClientController.apagarActuador);


app.use('/smarthome', smartHome);
app.use('/auth', auth);


app.listen(3000, function () {
	console.log("Servidor Iniciado en http://localhost:3000");
});


