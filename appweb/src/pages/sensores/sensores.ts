import { Device } from './../../models/device';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

import { Chart } from 'chart.js';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


@IonicPage()
@Component({
  selector: 'page-sensores',
  templateUrl: 'sensores.html',
})
export class SensoresPage implements OnInit {

  @ViewChild('graphCanvas') graphsCanvas;

  graph: any;

  devices: Device[];

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
    this.api.getSensorDevices()
      .subscribe(res => {
        this.devices = res;
        loading.dismiss();
        this.loadData();
      }, err => {
        this.devices = [];
        this.alert("ERROR", err.error.error);
        loading.dismiss();
      });
  }

  loadData() {
    this.devices.forEach(device => {
      setInterval(() => {
        this.api.getSensorTemp(device.ip)
          .subscribe(data => {
            device.temp = data.temperatura != null ? data.temperatura : device.temp;
          }, err => {
          });
        this.api.getSensorHumidity(device.ip)
          .subscribe(data => {
            device.humidity = data.humedad != null ? data.humedad : device.humidity;
          });
        this.api.getSensorGas(device.ip)
          .subscribe(data => {
            device.gas = data.gas != null ? data.gas : device.gas;
          }, err => {
          });
        this.api.getSensorLuminity(device.ip)
          .subscribe(data => {
            device.luminosidad = data.luminosidad != null ? data.luminosidad : device.luminosidad;
          });
      }, 2000);
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
