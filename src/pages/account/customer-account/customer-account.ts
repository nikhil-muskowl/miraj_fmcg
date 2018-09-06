import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// pages
import { CustomerLoginPage } from '../customer-login/customer-login';
import { CustomerOrderPage } from '../customer-order/customer-order';
import { CustomerRequestsPage } from '../customer-requests/customer-requests';
import { CustomerWishlistPage } from '../customer-wishlist/customer-wishlist';
import { CustomerAccountEditPage } from '../customer-account-edit/customer-account-edit';
import { CustomerChangePasswordPage } from '../customer-change-password/customer-change-password';
import { HomePage } from '../../../pages/home/home';

import { CartPage } from '../../../pages/shopping-cart/cart/cart';
import { SearchProductsPage } from '../../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../../providers/follow-us/follow-us';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';

// providers
import { CustomerProvider } from '../../../providers/customer/customer';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ToastProvider } from '../../../providers/toast/toast';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-customer-account',
  templateUrl: 'customer-account.html',
})
export class CustomerAccountPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  public heading_title;
  public customer;
  public email;
  public telephone;
  public responseData;

  constructor(
    private customerProvider: CustomerProvider,
    public navCtrl: NavController,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private followUsProvider: FollowUsProvider,
  ) {
    this.heading_title = 'My Account';
    this.isLogin();
  }
  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
   
  }

  isLogin() {
    console.log(this.customerProvider.customer_id);
    if (!this.customerProvider.customer_id) {
      this.navCtrl.setRoot(CustomerLoginPage);
    } else {
      this.customerProvider.getCustomerData(this.customerProvider.customer_id).subscribe(
        response => {
          if (response) {
            this.responseData = response;
            this.customer = this.responseData.fullname;
            this.email = this.responseData.email;
            this.telephone = this.responseData.telephone;
           
          }
        },
        err => console.error(err),
        () => {
        }
      );
    }
    
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Confirm logout',
      message: 'Do you want to logout from this app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.customerProvider.logout();
            this.navCtrl.push(HomePage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();

  }

  gotoWishlist() {
    this.navCtrl.push(CustomerWishlistPage);
  }

  gotoOrders() {
    this.navCtrl.push(CustomerOrderPage);
  }

  gotoCustomerRequestsPage() {
    this.navCtrl.push(CustomerRequestsPage);
  }

  gotoEditAccount() {
    this.navCtrl.push(CustomerAccountEditPage);
  }

  gotoChangePassword() {
    this.navCtrl.push(CustomerChangePasswordPage);
  }

  presentActionSheet() {
    this.followUsProvider.presentActionSheet();
  }

  goToAccount() {
    if (!this.customerProvider.customer_id) {
      this.navCtrl.push(CustomerLoginPage);
    } else {
      this.navCtrl.push(CustomerAccountPage);
    }
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goTocart() {
    this.navCtrl.push(CartPage);
  }

  goToWishlist() {
    this.navCtrl.push(CustomerWishlistPage);
  }

  goToSearch() {
    this.navCtrl.push(SearchProductsPage);
  }
}
