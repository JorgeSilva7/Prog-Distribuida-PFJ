const Ice = require("ice").Ice;
const SmartHome = require("../generated/SmartHome").SmartHome;
require("../models/Device");
var deviceController = require("./DeviceController");

async function connectToDevice(req, res) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const device = await deviceController.getDeviceCliente(req, res);
        const base = communicator.stringToProxy("SimplePrinter:tcp -h " + device.ip + " -p 10000");
        const smartHome = await SmartHome.IluminacionPrx.checkedCast(base);
        if (smartHome) return smartHome;
        return null
    }
    catch (ex) {
        process.exitCode = 1;
        return null;
    }
}

exports.encenderLampara = async function (req, res) {
    let smartHome = await connectToDevice(req, res);
    if (smartHome) {
        await smartHome.encenderLampara(req.params.idDorm, req.params.idLamp);
    } else {
        return res.status(500).jsonp({
            error: true,
            mensaje: "Servidor no encontrado (IP MAL ESCRITA, SMART HOME APAGADO)"
        }
        );
    }
    return res.status(200).jsonp({ "success": true });
}

exports.apagarLampara = async function (req, res) {

    let smartHome = await connectToDevice(req, res);
    if (smartHome)
        await smartHome.apagarLampara(req.params.idDorm, req.params.idLamp);
    else
        return res.status(500).jsonp({
            error: true,
            mensaje: "Servidor no encontrado (IP MAL ESCRITA, SMART HOME APAGADO)"
        }
        );

    return res.status(200).jsonp({ "success": true });
}