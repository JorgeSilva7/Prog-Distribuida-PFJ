#pragma once

module PyActuator
{
    interface Actuators
    {
         //Turn On
        void turnOnFans(string ipDorm, int timeOn);
        void turnOnExtracts(string ipDorm, int timeOn);
        void turnOnLight(string ipDorm, int portBulb, int timeOn);
        void turnOnAlarm(string ipAlarm, int timeOn);
        void turnOnAllAlarms();
        //Turn Off
        void turnOffFans(string ipDorm, int timeOn);
        void turnOffExtracts(string ipDorm, int timeOn);
        void turnOffLight(string ipDorm, int portBulb, int timeOn);
        void turnOffAlarm(string ipAlarm, int timeOn);
        void turnOffAllAlarms();
    }
}