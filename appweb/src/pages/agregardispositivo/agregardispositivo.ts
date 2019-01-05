import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiServiceProvider } from '../../providers/api-service/api-service';


@IonicPage()
@Component({
  selector: 'page-agregardispositivo',
  templateUrl: 'agregardispositivo.html',
})
export class AgregardispositivoPage {
  addDeviceForm: FormGroup;
  editDeviceForm: FormGroup;

  device = { "ip": "", "name": "", "type": -1};
  deviceEdit = { "ip": "", "name": "", "type": ""};

  data: any;

  title: String;

  idDevice: String;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController, 
    private navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {
      this.title = this.navParams.get("title");
      this.idDevice = this.navParams.get("id");
      this.deviceEdit.name = this.navParams.get("deviceName");
      this.deviceEdit.type = this.navParams.get("deviceType");
      this.deviceEdit.ip = this.navParams.get("deviceIp");
  }

  ngOnInit() {
    this.addDeviceForm = new FormGroup({
      ip: new FormControl('', [Validators.required, Validators.minLength(7)]),
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [])
    });

    this.editDeviceForm = new FormGroup({
      ip: new FormControl(this.deviceEdit.ip, [Validators.required, Validators.minLength(7)]),
      name: new FormControl(this.deviceEdit.name, [Validators.required]),
      type: new FormControl(this.deviceEdit.type, [])
    });
  }

  addDevice() {
    if(this.device.type == -1){
      this.errorAlert("Selecciona un tipo");
    } else {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });
    loading.present();
    this.api.addDevice(this.device.ip, this.device.name, this.device.type)
      .subscribe(res => {
        this.data = res;
        loading.dismiss();
        this.closePage();
      }, err => {
        this.errorAlert(err.error.error);
        loading.dismiss();
      });
    }
  }

  editDevice() {
    if(this.deviceEdit.type == "-1"){
      this.errorAlert("Selecciona un tipo");
    } else {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });
    loading.present();
    this.api.editDevice(this.idDevice, this.deviceEdit.ip, this.deviceEdit.name, Number(this.deviceEdit.type))
      .subscribe(res => {
        this.data = res;
        loading.dismiss();
        this.closePage();
      }, err => {
        this.errorAlert(err.error.error);
        loading.dismiss();
      });
    }
  }



  errorAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'ERROR',
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }

  closePage() {
    this.navCtrl.pop();
  }

}
