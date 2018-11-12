const Ice = require("ice").Ice;
const SmartHome = require("./generated/SmartHome").SmartHome;

(async function()
{
    let communicator;
    try
    {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("SimplePrinter:tcp -h 10.10.11.4 -p 10000");
        const iluminacion = await SmartHome.IluminacionPrx.checkedCast(base);
        if(iluminacion)
        {
            //await iluminacion.encenderLampara(1,1);
            
            await iluminacion.apagarLampara(1,1);            
        }
        else
        {
            console.log("Invalid proxy");
        }
    }
    catch(ex)
    {
        console.log(ex.toString());
        process.exitCode = 1;
    }
    finally
    {
        if(communicator)
        {
            await communicator.destroy();
        }
    }
}());