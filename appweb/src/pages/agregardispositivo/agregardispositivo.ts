import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AgregardispositivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregardispositivo',
  templateUrl: 'agregardispositivo.html',
})
export class AgregardispositivoPage {

  title: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.get("title");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregardispositivoPage');
  }

}
