import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sensores',
        children: [
          {
            path: '',
            loadChildren: '../sensores/sensores.module#SensoresPageModule'
          }
        ]
      },
      {
        path: 'actuadores',
        children: [
          {
            path: '',
            loadChildren: '../actuadores/actuadores.module#ActuadoresPageModule'
          }
        ]
      },
      {
        path: 'opciones',
        children: [
          {
            path: '',
            loadChildren: '../opciones/opciones.module#OpcionesPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/sensores',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sensores',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
