#pragma once

module PyActuator
{
    interface Actuators
    {
         //Turn On
        void turnOnFans(string ipDorm);
        void turnOnExtracts(string ipDorm);
        void turnOnBulb(string ipDorm, int portBulb);
        void turnOnLamp(string ipDorm, int portLamp);
        void turnOnAlarm(string ipAlarm);
        void turnOnAllAlarms();
        //Turn Off
        void turnOffFans(string ipDorm);
        void turnOffExtracts(string ipDorm);
        void turnOffBulb(string ipDorm, int portBulb);
        void turnOffLamp(string ipDorm, int portLamp);
        void turnOffAlarm(string ipAlarm);
        void turnOffAllAlarms();
    }
}