const Ice = require("ice").Ice;
const SmartHome = require("../generated/SmartHomeActuators").SmartHomeActuators;
require("../models/Device");
var deviceController = require("./DeviceController");

async function connectToDevice(req, res) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const device = await deviceController.getDeviceCliente(req, res);
        const base = communicator.stringToProxy("SimplePrinter:tcp -h " + device.ip + " -p 10000");
        const SmartHomeActuators = await SmartHome.ActuatorsPrx.checkedCast(base);
        if (SmartHomeActuators) return SmartHomeActuators;
        return null;
    }
    catch (ex) {
        process.exitCode = 1;
        return null;
    }
}

exports.encenderActuador = async function (req, res) {
    let SmartHomeActuators = await connectToDevice(req, res);
    if (SmartHomeActuators != null) {
        await SmartHomeActuators.turnOn(req.params.idDorm, req.params.idIn);
    } else {
        return res.status(500).jsonp({
            error: true,
            mensaje: "Servidor no encontrado (IP MAL ESCRITA, SMART HOME APAGADO)"
        });
    }
    return res.status(200).jsonp({ "success": true });x
}

exports.apagarActuador = async function (req, res) {

    let SmartHomeActuators = await connectToDevice(req, res);
    if (SmartHomeActuators != null)
        await SmartHomeActuators.turnOff(req.params.idDorm, req.params.idIn);
    else
        return res.status(500).jsonp({
            error: true,
            mensaje: "Servidor no encontrado (IP MAL ESCRITA, SMART HOME APAGADO)"
        });

    return res.status(200).jsonp({ "success": true });
}