import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    this.navCtrl.setRoot( LoginPage );
  }

}
