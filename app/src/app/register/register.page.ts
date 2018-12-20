import { Component, OnInit, ViewChild, } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public api: AuthServiceService, public loadingController: LoadingController,
    private router: Router, private alertCtrl: AlertController, private location: Location) {
  }

  data: any;
  @ViewChild("email") email;
  @ViewChild("name") name;
  @ViewChild("lastName") lastName;
  @ViewChild("password") password;
  @ViewChild("confirmPassword") confirmPassword;

  ngOnInit() {
  }

  async register() {
    const loading = await this.loadingController.create({
      message: 'Procesando'
    });

    if (this.confirmPassword.value != this.password.value) {
      await loading.present();
      this.alert("ERROR", "Contraseñas no coinciden");
      loading.dismiss();
    } else {
      await loading.present();
      this.api.register(this.email.value,
        this.name.value,
        this.lastName.value,
        this.password.value)
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

  async alert(title, msg) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  back() {
    this.location.back();
  }
}
