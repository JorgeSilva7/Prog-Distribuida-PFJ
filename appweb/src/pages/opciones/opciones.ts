import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { DispositivosPage } from '../dispositivos/dispositivos';

/**
 * Generated class for the OpcionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opciones',
  templateUrl: 'opciones.html',
})
export class OpcionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionesPage');
  }

  profile(){
    
  }

  devices(){
    this.navCtrl.push( DispositivosPage );
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    //this.navCtrl.setRoot( LoginPage );
    this.app.getRootNav().setRoot(LoginPage);


  }

}
