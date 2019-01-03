import { Component } from '@angular/core';

import { SensoresPage } from '../sensores/sensores';
import { ActuadoresPage } from '../actuadores/actuadores';
import { OpcionesPage } from '../opciones/opciones';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  sensoresRoot = SensoresPage;
  actuadoresRoot = ActuadoresPage;
  opcionesRoot = OpcionesPage;

  constructor() {

  }
}
