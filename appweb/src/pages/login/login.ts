import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { TabsPage } from './../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  signInForm: FormGroup;
  login = { "email": "", "password": ""};
  remember: boolean;

  data: any;

  constructor(public api: ApiServiceProvider, public loadingController: LoadingController, 
    private navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signInForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });

    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    if(email && password){
      this.login.email = email;
      this.login.password = password;
      this.signIn();
    }
  }

  signIn() {
    let loading = this.loadingController.create({
      content: 'Procesando...'
    });
    loading.present();
    this.api.login(this.login.email, this.login.password)
      .subscribe(res => {
        this.data = res;
        localStorage.setItem('token', res.token);
        if(this.remember){
          localStorage.setItem('email', this.login.email);
          localStorage.setItem('password', this.login.password);
        }
        loading.dismiss();
        this.navCtrl.setRoot( TabsPage);
      }, err => {
        this.errorAlert(err.error.error);
        loading.dismiss();
      });
  }

  errorAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'ERROR',
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }

  /**
   * Send to RegisterPage
   */
  signUp(){
    this.navCtrl.push( RegisterPage );
  }

}
