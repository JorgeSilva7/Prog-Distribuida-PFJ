#!/usr/bin/env python
# **********************************************************************
#
# Copyright (c) 2003-2018 ZeroC, Inc. All rights reserved.
#
# **********************************************************************

import signal
import sys
import time
import Ice
import IceStorm
import getopt
import Adafruit_DHT
Ice.loadSlice('Sensor.ice')
import PySensor
#Se define sensor
sensor = Adafruit_DHT.DHT22
# Se define el pin por el cual son transmitidos los datos desde el sensor DTH22 hacia la raspberry pi.
pin = 4

def usage():
    print("Usage: " + sys.argv[0] + " [--datagram|--twoway|--oneway] [topic]")


def run(communicator):
    try:
        opts, args = getopt.getopt(sys.argv[1:], '', ['datagram', 'twoway', 'oneway'])
    except getopt.GetoptError:
        usage()
        sys.exit(1)

    datagram = False
    twoway = False
    optsSet = 0
    topicName = "time"
    for o, a in opts:
        if o == "--datagram":
            datagram = True
            optsSet = optsSet + 1
        elif o == "--twoway":
            twoway = True
            optsSet = optsSet + 1
        elif o == "--oneway":
            optsSet = optsSet + 1

    if optsSet > 1:
        usage()
        sys.exit(1)

    if len(args) > 0:
        topicName = args[0]

    manager = IceStorm.TopicManagerPrx.checkedCast(communicator.propertyToProxy('TopicManager.Proxy'))
    if not manager:
        print(args[0] + ": invalid proxy")
        sys.exit(1)

    #
    # Retrieve the topic.
    #
    try:
        topic = manager.retrieve(topicName)
    except IceStorm.NoSuchTopic:
        try:
            topic = manager.create(topicName)
        except IceStorm.TopicExists:
            print(sys.argv[0] + ": temporary error. try again")
            sys.exit(1)

    #
    # Get the topic's publisher object, and create a Clock proxy with
    # the mode specified as an argument of this application.
    #
    publisher = topic.getPublisher()
    if datagram:
        publisher = publisher.ice_datagram()
    elif twoway:
        # Do nothing.
        pass
    else:  # if(oneway)
        publisher = publisher.ice_oneway()
    pySensor = PySensor.SensorPrx.uncheckedCast(publisher)

    print("publishing tick events. Press ^C to terminate the application.")
    try:
        while 1:
            pySensor.getTemperature(Adafruit_DHT.read_retry(sensor, pin))
            #clock.mostrar("hola")
            time.sleep(1)
    except IOError:
        # Ignore
        pass
    except Ice.CommunicatorDestroyedException:
        # Ignore
        pass


#
# Ice.initialize returns an initialized Ice communicator,
# the communicator is destroyed once it goes out of scope.
#
with Ice.initialize(sys.argv, "config.pub") as communicator:
    signal.signal(signal.SIGINT, lambda signum, frame: communicator.destroy())
    if hasattr(signal, 'SIGBREAK'):
        signal.signal(signal.SIGBREAK, lambda signum, frame: communicator.destroy())
    status = run(communicator)