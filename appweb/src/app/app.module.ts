import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ActuadoresPage } from '../pages/actuadores/actuadores';
import { OpcionesPage } from '../pages/opciones/opciones';
import { SensoresPage } from '../pages/sensores/sensores';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DispositivosPage } from './../pages/dispositivos/dispositivos';
import { AgregardispositivoPage } from './../pages/agregardispositivo/agregardispositivo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http'; 
import { ApiServiceProvider } from '../providers/api-service/api-service';

@NgModule({
  declarations: [
    MyApp,
    ActuadoresPage,
    OpcionesPage,
    SensoresPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    DispositivosPage,
    AgregardispositivoPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActuadoresPage,
    OpcionesPage,
    SensoresPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    DispositivosPage,
    AgregardispositivoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider
  ]
})
export class AppModule {}
