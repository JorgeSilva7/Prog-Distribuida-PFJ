import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController, NavController } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';
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

  data: any;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController,
    private alertCtrl: AlertController, public navParams: NavParams, public navCtrl: NavController) {
      
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
    this.api.getDevices()
      .subscribe(res => {
        this.data = res;
        loading.dismiss();
      }, err => {
        this.alert("ERROR", err.error.error);
        loading.dismiss();
      });
  }

  addDevicePage(){
    this.navCtrl.push(AgregardispositivoPage, {"title": "Agregar"});
  }

  editDevicePage(idDevice, deviceName, deviceIp, deviceType){
    this.navCtrl.push(AgregardispositivoPage, 
      {
        "title": "Editar", 
        "id": idDevice, 
        "deviceName": deviceName,
        "deviceIp": deviceIp,
        "deviceType": deviceType
    })
  }

  removeDeviceAlert(idDevice, deviceName){
    const alert = this.alertCtrl.create({
      title: 'CONFIRMANDO ELIMINACIÓN',
      message: 'DESEA ELIMINAR EL DISPOSITIVO: '+deviceName,
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        },
        {
          text: 'ELIMINAR',
          handler: () =>{
            this.removeDevice(idDevice);
          }
        }
    ]
    });

    alert.present();
  }

  removeDevice(idDevice){
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    loading.present();
    this.api.removeDevice(idDevice)
      .subscribe(res => {
        this.data = res;
        loading.dismiss();
        this.getDevices();
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
