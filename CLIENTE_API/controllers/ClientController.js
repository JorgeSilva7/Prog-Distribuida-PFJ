const Ice = require("ice").Ice;
const SmartHome = require("../generated/SmartHomeActuators").SmartHomeActuators;
require("../models/Device");
var deviceController = require("./DeviceController")

var SmartHomeActuators = null;

async function connectToDevice(req, res) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const device = await deviceController.getDeviceCliente(req, res);
        const base = communicator.stringToProxy("SimplePrinter:tcp -h " + device.ip + " -p 10000 -t 5000");
        SmartHomeActuators = await SmartHome.ActuatorsPrx.checkedCast(base);
        if (SmartHomeActuators) return SmartHomeActuators;
        return null;
    }
    catch (ex) {
        return null;
    }
}

exports.encenderActuador = async function (req, res) {
    let SmartHomeActuators = await connectToDevice(req, res);
    if (SmartHomeActuators != null) {
        await SmartHomeActuators.turnOn(req.params.idDorm, req.params.idIn);
        return res.status(200).jsonp({ "success": true });
    } else {
        return res.status(500).jsonp({
            error: "Servidor no encontrado (IP MAL ESCRITA, SMART HOME APAGADO)"
        });
    }
}

exports.apagarActuador = async function (req, res) {

    let SmartHomeActuators = await connectToDevice(req, res);
    if (SmartHomeActuators != null) {
        await SmartHomeActuators.turnOff(req.params.idDorm, req.params.idIn);
        return res.status(200).jsonp({ "success": true });
    } else {
        return res.status(500).jsonp({
            error: "Servidor no encontrado (IP MAL ESCRITA, SMART HOME APAGADO)"
        });
    }
}