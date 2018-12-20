import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public api: AuthServiceService, public loadingController: LoadingController, 
    private navCtrl: NavController, private alertCtrl: AlertController) { 
  }

  data: any;
  @ViewChild("email") email;
  @ViewChild("password") password;

  ngOnInit() {
  }

  async signIn() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.api.login(this.email.value, this.password.value)
      .subscribe(res => {
        this.data = res[0];
        loading.dismiss();
        this.navCtrl.navigateRoot('/tabs');
      }, err => {
        console.log(err);
        this.errorAlert(err.error.error);
        console.log(" we");
        loading.dismiss();
      });
  }

  async errorAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * Send to RegisterPage
   */
  signUp(){
    this.navCtrl.navigateForward('/register');
  }
}
