#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Jun 28 20:37:52 2018
@author: Felipe Quezada
"""

import sys
import time
import Adafruit_DHT
# Se instancia el sensor
sensor = Adafruit_DHT.DHT22
# Se define el pin por el cual son transmitidos los datos desde el sensor DTH22 hacia la raspberry pi.
pin = 4

class DHT22_Sensor(object):
    # Funcion genesis es la funcion en donde se realiza toda la logica de aplicacion.
    def getDHT22_DataInterval(self):
        # Se define bucle principal del sistema.
        while True:
            humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
            #ahora=time.strftime("%H:%M:%S")
            ahora=time.strftime("%c")

            if humidity is not None and temperature is not None:
                print("Fecha y hora %s"  % ahora)
                print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
            else:
                print('Fallo al obtener lectura. # WARNING: !')
                sys.exit(1)

        # Se define el tiempo de espera entre cada lectura de datos
            time.sleep(3)
    #Metodo para obtener solo el valor de la temperatura
    def getDHT22_Data(self):
        humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
        #ahora=time.strftime("%H:%M:%S")
        ahora=time.strftime("%c")
        if humidity is not None and temperature is not None:
            print("Fecha y hora %s"  % ahora)
            print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
        else:
            print('Fallo al obtener lectura. # WARNING: !')
            sys.exit(1)
