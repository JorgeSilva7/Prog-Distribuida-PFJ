var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Device = mongoose.model('Device');

//Retorna todos los dispositivos
exports.listDevices = function(req, res){
	Device.find(function(err, devices){
		if(err) return res.send(500, err.message);
		return res.status(200).send(devices);
    });
};

//Agrega un nuevo dispositivo
exports.addDevice = async function (req, res) {

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

//Retorna json con error si es que lo hay en algun campo (al agregar device)
checkBodyUser = function (req){
	let error ="";
	if(req.body.ip == null) error = {"error": "Falta el ip"};
	if(req.body.name == null) error = {"error": "Falta el nombre"};
	return error;
}