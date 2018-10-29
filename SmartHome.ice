/**
* Jorge Silva
*/
module SmartHome {
    interface Iluminacion {
        void encenderLampara(int idDorm, int idLamp);
        void apagarLampara(int idDorm, int idLamp);

        void obtenerTH();
        void obtenerCicloTH();
      };



};
