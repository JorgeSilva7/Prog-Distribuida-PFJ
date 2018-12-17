/**
* Jorge Silva
*/
module SmartHomeActuators {
    interface Actuators {        
        //Turn On
        void turnOn(int idDorm, int idIn);
        //Turn Off
        void turnOff(int idDorm, int idIn);
    };
};