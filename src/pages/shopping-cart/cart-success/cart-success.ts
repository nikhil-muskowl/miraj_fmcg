import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../../../pages/home/home';
import { CustomerOrderPage } from '../../../pages/account/customer-order/customer-order';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-cart-success',
  templateUrl: 'cart-success.html',
})
export class CartSuccessPage {
  public heading_title = 'Success';
  private redirecturl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public platform: Platform) {

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
        hardwareback: 'yes',
        location: 'yes',
        toolbar: 'yes',
        footer:'yes'
      }

      //const browser = this.iab.create(url, '_self', option);
      //browser.show();
      
     
        this.platform.ready().then(() => {
          const browser = this.iab.create(url, '_self', option);
          browser.show();
          this.platform.registerBackButtonAction(() => {
            console.log('inside');
           
            // this.navCtrl.push(CustomerOrderPage);
            this.navCtrl.setRoot(CustomerOrderPage);
            // backAction();
         });
      });
 
    }
  }

}
