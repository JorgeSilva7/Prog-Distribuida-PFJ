import { Device } from './../../models/device';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


@IonicPage()
@Component({
  selector: 'page-sensores',
  templateUrl: 'sensores.html',
})
export class SensoresPage implements OnInit{

  devices: Device;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController,
    private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    loading.present();
    this.api.getSensorDevices()
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
}
