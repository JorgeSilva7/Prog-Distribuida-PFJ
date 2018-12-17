var jwt = require('jsonwebtoken')
var config = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

//Retorna todos los usuarios
exports.listUsers = function(req, res){
	User.find(function(err, users){
		if(err) return res.send(500, err.message);
		return res.status(200).send(users);
    });
};

//Agrega un nuevo usuario
exports.addUser = async function (req, res) {

    let checkbodyresponse = checkBodyUser(req);
    if (checkbodyresponse != "") return res.status(200).send(checkbodyresponse);

    var error = false;

    await User.findOne({ 'email': req.body.email }, function (err, user) {
        if (err) {
            error = true;
            return res.status(500).send(err.message);
        }
        if (user != null) {
            error = true;
            return res.status(401).send({ "error": "Email ya existe" });
        }
    });

    if (!error) {
        if (req.body == null) return res.status(500).send("BAD REQUEST");

        var hash = bcrypt.hashSync(req.body.password, salt);

        var user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });

        user.save(function (err, user) {
            if (err) return res.status(500).send(err.message);
            return res.status(200).send(user);
        });
    }
}

//Login de usuario
exports.loginUser = function(req, res){
	//Encuentra el usuario con el username del body y luego lo guarda en "user"
	User.findOne({'email': req.body.email}, function(err, user){
		if(err) return res.send(500, err.message);
		//Si no hay usuario asociado a ese nombre de usuario se retorna error 
		if(user == null) return res.status(401).send({"error" : "Usuario no encontrado"});

		//Se compara la password del body con la password de la BD 
		bcrypt.compare(req.body.password, user.password, function(err, decrypt) {
            if(err) return res.status(500).send(err.message);

			//Si son iguales retorna el usuario logueado, caso contrario un error
			if(decrypt){
                var tokenData = {
                    id: user._id
                }
            
                var token = jwt.sign(tokenData, config.secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                })
                
                return res.status(200).send({"token": token});
			}else{
				return res.status(401).send({"error" : "Contraseña no corresponde"});
			}		
		});
	});
};

//Retorna json con error si es que lo hay en algun campo (al agregar usuario)
checkBodyUser = function (req){
	let error ="";
	if(req.body.name == null) error = {"error": "Falta el nombre"};
	if(req.body.email == null) error = {"error": "Falta el email"};
	if(req.body.password == null) error = {"error": "Falta la contraseña"};
	else if(req.body.password.length < 6) error = {"error": "Contraseña muy corta"};
	return error;
}