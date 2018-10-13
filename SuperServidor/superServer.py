import sys, Ice
import SS as Ss
import Demo

class SuperServeI(Ss.Get):
    def printString(self,s,port, current=None):
        base = communicator.stringToProxy("Climate:default -h localhost -p "+port)
        printer = Demo.PrinterPrx.checkedCast(base)
        print("derivado a server con puerto: "+port)
        printer.printString(s)

with Ice.initialize(sys.argv) as communicator:
    adapter = communicator.createObjectAdapterWithEndpoints("ClimateAdapater", "default -p 10001")
    object = SuperServeI()
    adapter.add(object, communicator.stringToIdentity("ClimateSS"))
    adapter.activate()
    communicator.waitForShutdown()