#pragma once

module PySensor
{
    interface Sensors
    {
        float sendTemperature();
        float sendHumidity();
        float sendGas();
        float sendLuminity();
        float sendMovement();
        float isWindowsOpen();
    }
}