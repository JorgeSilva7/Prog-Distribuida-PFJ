import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController, ModalController, Modal } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Device } from './../../models/device';
import { AgregardispositivoPage } from '../agregardispositivo/agregardispositivo';

/**
 * Generated class for the DispositivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html',
})
export class DispositivosPage {

  devices: Device;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController,
    private alertCtrl: AlertController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    loading.present();
    this.api.getDevices()
      .subscribe(res => {
        this.devices = res;
        console.log(res);
        loading.dismiss();
      }, err => {
        this.alert("ERROR", err.error.error);
        loading.dismiss();
      });
  }

  addDeviceModal(){
    const modal = this.modalCtrl.create( AgregardispositivoPage, {"title": "Agregar"} );
    modal.present();
  }

  editDevice(idDevice){
    const modal = this.modalCtrl.create( AgregardispositivoPage, {"title": "Editar"} );
    modal.present();
  }

  alert(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }

}
