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

//Agrega un nuevo dispositivo
exports.addDevice = async function (req, res) {

    let checkbodyresponse = checkBodyDevice(req);
    if (checkbodyresponse != "") return res.status(401).send(checkbodyresponse);

    if (req.body == null) return res.status(400).send("BAD REQUEST");


    var device = new Device({
        userId: req.user._id,
        ip: req.body.ip,
        name: req.body.name
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
    return error;
}