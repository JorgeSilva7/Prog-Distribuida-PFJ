import RPi.GPIO as GPIO
import time
#Definimos el modo BCN
GPIO.setmode(GPIO.BOARD)
#Se define el pin GPIO 18 como salida
GPIO.setup(11, GPIO.OUT)
class Iluminacion(object):
    def encenderLed(self):
        GPIO.output(11, GPIO.HIGH)

    def apagarLed(self):
        GPIO.output(11, GPIO.LOW)

    def salir(self):
        GPIO.cleanup()
