import sys, Ice
import SmartHome
import time

with Ice.initialize(sys.argv) as communicator:
    base = communicator.stringToProxy("SimplePrinter:default -h 192.168.1.102 -p 10000")
    printer = SmartHome.IluminacionPrx.checkedCast(base)
    if not printer:
        raise RuntimeError("Invalid proxy")

    # printer.encenderLampara(10,5)
    # time.sleep(5)
    # printer.apagarLampara(10,5)
    printer.obtenerTH()
