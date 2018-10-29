import sys, Ice
import SmartHome
import SmartHome.modulos.Encenderled as Led
import SmartHome.modulos.Modulo_DHT22 as DHT22

superLed = Led.Iluminacion()
dht22= DHT22.DHT22_Sensor()
class Iluminacion(SmartHome.Iluminacion):
    #Metodo para encender led
    def encenderLampara(self, idDorm, idLamp, current=None):
        print("Encediendo Lampara Dormitorio = "+str(idDorm)+", Lampara =  "+str(idLamp))
        superLed.encenderLed()

    #Metodo para apagar led
    def apagarLampara(self, idDorm, idLamp, current=None):
        print("Apagando Lampara Dormitorio = "+str(idDorm)+", Lampara = "+str(idLamp))
        superLed.apagarLed()
    #metodo para obtener temperatura y humedad, solo una vez
    def obtenerTH(self, current=None):
        dht22.getDHT22_Data()

    #Metodo para obtener temperatura y humedad cada 3 segundos.
    def obtenerCicloTH(self, current=None):
        dht22.getDHT22_DataInterval()


with Ice.initialize(sys.argv) as communicator:
    adapter = communicator.createObjectAdapterWithEndpoints("SimplePrinterAdapter", "default  -p 10000")
    object = Iluminacion()
    adapter.add(object, communicator.stringToIdentity("SimplePrinter"))
    adapter.activate()
    communicator.waitForShutdown()
