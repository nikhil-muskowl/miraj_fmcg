import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../../pages/home/home';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-cart-success',
  templateUrl: 'cart-success.html',
})
export class CartSuccessPage {
  public heading_title = 'Success';
  private redirecturl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {

    this.redirecturl = this.navParams.data.redirecturl;
    this.Payment(this.redirecturl);
  }

  ionViewDidLoad() {

  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  Payment(url) {
    if (url != '') {
      const option: InAppBrowserOptions = {
        zoom: 'no',
        hardwareback: 'no',
        location: 'no',
        toolbar: 'no'
      }

      const browser = this.iab.create(url, '_self', option);
      browser.show();
    }
  }

}
