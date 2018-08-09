import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../../pages/home/home';
@IonicPage()
@Component({
  selector: 'page-cart-success',
  templateUrl: 'cart-success.html',
})
export class CartSuccessPage {
  public heading_title='Success';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
