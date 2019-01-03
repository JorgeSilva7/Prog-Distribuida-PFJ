import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  signupform: FormGroup;
  userData = { "email": "", "password": "", "confirmPassword": "", "name": "", "lastName": "" };

  data: any;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController,
    private navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4)]),
      lastName: new FormControl('', []),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordConfirming]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  passwordConfirming(c: AbstractControl): any {
    if(!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword');

    if(!pwd || !cpwd) return ;
    if (pwd.value !== cpwd.value) {
        return { invalid: true };
    }
}

  register() {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });

    if (this.userData.confirmPassword != this.userData.password) {
      loading.present();
      this.alert("ERROR", "Contraseñas no coinciden");
      loading.dismiss();
    } else {
      loading.present();
      this.api.register(this.userData.email,
        this.userData.name,
        this.userData.lastName,
        this.userData.password)
        .subscribe(res => {
          this.data = res[0];
          loading.dismiss();
          this.back();
          this.alert("Bien!", "Ya estas registrado!. Ahora ingresa con tus datos.")
        }, err => {
          this.alert("ERROR", err.error.error);
          loading.dismiss();
        });
    }
  }

  alert(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }

  back() {
    this.navCtrl.pop();
  }

}
