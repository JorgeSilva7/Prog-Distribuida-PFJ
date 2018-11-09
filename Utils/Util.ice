#pragma once

module PySensor
{
    interface Sensors
    {
        void getRoomsList();
        void getRoom(string ipDorm);
        void getSumary();
    }
}