/**
* Jorge Silva
*/
module SmartHome {
    interface Iluminacion {        
        //Turn On
        void encenderLampara(int idDorm, int idLamp);
        //Turn Off
        void apagarLampara(int idDorm, int idLamp);
    };
};