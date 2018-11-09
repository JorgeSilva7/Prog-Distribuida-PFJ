#pragma once

module PySensor
{
    interface Sensors
    {
        double getTemperature(string ipPlace);
        double getHumidity(string ipPlace);
        double getCO2(string ipPlace);
        double getGas(string ipPlace);
        double getLuminity(string ipPlace);
        void monitorCO2(string ipPlace);
        void monitorGas(string ipPlace);
        void detectSmoke(string ipPlace);
        void detectSmoke();
        void detectMotion(string ipPlace);
        void detectMotion();
        void detectstringeractionWinDoo(string ipPlace);
        void detectstringeractionWinDoo();
        void detectFlame(string ipPlace);
        void detectFlame();
    }
}