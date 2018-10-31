const Ice = require("ice").Ice;
const SmartHome = require("../generated/SmartHome").SmartHome;

var smartHome;

exports.intialize = async function(req, res){
    let communicator;
    try
    {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("SimplePrinter:tcp -h "+ req.query.ip +" -p 10000");
        smartHome = await SmartHome.IluminacionPrx.checkedCast(base);
        if(smartHome)
        {            
            return true;
        }
        else
        {
            smartHome =null;
            return false;
        }
    }
    catch(ex)
    {
        smartHome =null;
        process.exitCode = 1;
        return false;
    }
}

exports.encenderLampara = async function(req, res){
    let conectado = await exports.intialize(req, res);
    if(conectado)
        await smartHome.encenderLampara(req.query.idDorm, req.query.idLamp);
    else
        return res.status(200).jsonp({"success" : false});

    return res.status(200).jsonp({"success" : true});
}

exports.apagarLampara = async function(req, res){

    let conectado = await exports.intialize(req, res);
    if(conectado)
        await smartHome.apagarLampara(req.query.idDorm, req.query.idLamp);
    else
        return res.status(200).jsonp({"success" : false});

    return res.status(200).jsonp({"success" : true});
}