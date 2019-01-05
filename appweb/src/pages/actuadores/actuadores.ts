import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Device } from './../../models/device';

/**
 * Generated class for the DispositivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actuadores',
  templateUrl: 'actuadores.html',
})
export class ActuadoresPage {

  devices: Device;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController,
    private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.getDevices();
  }

  getDevices() {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    loading.present();
    this.api.getActuatorDevices()
      .subscribe(res => {
        this.devices = res;
        loading.dismiss();
      }, err => {
        this.alert("ERROR", err.error.error);
        loading.dismiss();
      });
  }

  alert(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }

  encender(pinout, idDevice){
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    loading.present();
    this.api.encender(idDevice, pinout)
      .subscribe(res => {
        this.alert("LISTO", "Encendido!");
        loading.dismiss();
      }, err => {
        this.alert("ERROR", err.error.error);
        loading.dismiss();
      });
  }

  apagar(pinout, idDevice){
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    loading.present();
    this.api.apagar(idDevice, pinout)
      .subscribe(res => {
        this.alert("LISTO", "Apagado!");
        loading.dismiss();
      }, err => {
        this.alert("ERROR", err.error.error);
        loading.dismiss();
      });
  }
}
