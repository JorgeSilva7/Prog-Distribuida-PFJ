var mongoose = require('mongoose');
var Device = mongoose.model('Device');

//Retorna el dispositivo con la id para el ClienteController
exports.getDeviceCliente = async function (req, res) {
    let device = await Device.findOne({ _id: req.params.id }, function (err, device) {
        if (err) return res.status(500).send(err);
        if (device == null) return res.status(404).send({ error: "No existe el dispositivo" });

        return device;
    });
    return device;
};

//Retorna el dispositivo con la id
exports.getDevice = async function (req, res) {
    let device = await Device.findOne({ _id: req.params.id }, function (err, device) {
        if (err) return res.status(500).send(err);
        if (device == null) return res.status(404).send({ error: "No existe el dispositivo" });

        return res.status(200).send(device);
    });
};

//Retorna el dispositivo con la id
exports.editDevice = function (req, res) {
    Device.findOne({ _id: req.params.id }, function (err, device) {
        if (err) return res.status(500).send(err);
        if (device == null) return res.status(404).send({ error: "No existe el dispositivo" });

        device.ip = req.body.ip != null ? req.body.ip : device.ip;
        device.name = req.body.name != null ? req.body.name : device.name;
        device.type = req.body.type != null ? req.body.type : device.type;

        device.save(function (err, device) {
            if (err) return res.status(500).send(err.message);
            return res.status(201).send(device);
        });
    });
};

//Retorna el dispositivo con la id
exports.deleteDevice = function (req, res) {
    Device.findOne({ _id: req.params.id }, function (err, device) {
        if (err) return res.status(500).send(err);
        if (device == null) return res.status(404).send({ error: "No existe el dispositivo" });

        device.delete();
        return res.status(204).send({ success: "Dispositivo eliminado" });
    });
};

//Retorna todos los dispositivos del usuario logeado
exports.listUserDevices = function (req, res) {
    Device.find({ _id: req.user.devices }, function (err, devices) {
        if (err) return res.status(500).send(err);

        if (devices.length < 1) return res.status(404).send({"error" : "No hay dispositivos"});

        return res.status(200).send(devices);
    });
};

//Retorna todos los dispositivos de tipo sensores del usuario logueado
exports.listUserSensorDevices = function (req, res) {
    Device.find({ _id: req.user.devices, type: 0 }, function (err, devices) {
        if (err) return res.status(500).send(err);

        if (devices.length < 1) return res.status(404).send({"error" : "No hay dispositivos"});

        return res.status(200).send(devices);
    });
};

//Retorna todos los dispositivos de tipo actuadores del usuario logueado
exports.listUserActuatorDevices = function (req, res) {
    Device.find({ _id: req.user.devices, type: 1 }, function (err, devices) {
        if (err) return res.status(500).send(err);

        if (devices.length < 1) return res.status(404).send({"error" : "No hay dispositivos"});

        return res.status(200).send(devices);
    });
};

//Agrega un nuevo dispositivo
exports.addDevice = async function (req, res) {

    let checkbodyresponse = checkBodyDevice(req);
    if (checkbodyresponse != "") return res.status(401).send(checkbodyresponse);

    if (req.body == null) return res.status(400).send("BAD REQUEST");


    var device = new Device({
        userId: req.user._id,
        ip: req.body.ip,
        name: req.body.name,
        type: req.body.type
    });

    req.user.devices.push(device);

    device.save(function (err, device) {
        if (!err) {
            req.user.save(function (err, user) {
                if (err) return res.status(500).send(err.message);
                return res.status(201).send(device);
            });
        }
    });

}

checkBodyDevice = function (req) {
    let error = "";
    if (req.body.ip == null) error = { "error": "Falta el ip" };
    if (req.body.name == null) error = { "error": "Falta el nombre" };
    if (req.body.type == null) error = { "error": "Falta el tipo (0: Sensores | 1: Actuadores)" };
    if (req.body.type != 1 && req.body.type != 0) error={"error": "El tipo debe ser Actuadores o Sensores"}
    return error;
}