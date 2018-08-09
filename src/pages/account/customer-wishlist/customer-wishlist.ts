import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { ProductPage } from '../../products/product/product';
import { CartProvider } from '../../../providers/cart/cart';
import { LoadingProvider } from '../../../providers/loading/loading';
import { WishlistProvider } from '../../../providers/wishlist/wishlist';
import { AlertProvider } from '../../../providers/alert/alert';
import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'page-customer-wishlist',
  templateUrl: 'customer-wishlist.html',
})
export class CustomerWishlistPage {
  public products;
  private formData: any;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  public heading_title;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private wishlistProvider: WishlistProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private customerProvider: CustomerProvider,
  ) {
    this.heading_title = 'Wishlist';
    if (this.isLogin()) {
      this.getServerData();
    }

  }

  ionViewDidLoad() {

  }

  goBack() {
    this.navCtrl.pop();
  }


  public getServerData() {
    this.loadingProvider.present();
    this.wishlistProvider.getWishlist().subscribe(
      response => {
        this.responseData = response;
        this.success = this.responseData.success;
        this.products = this.responseData.products;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }


  addCart(data: any) {
    this.formData = {
      quantity: 1,
      product_id: Number(data.product_id)
    };
    this.loadingProvider.present();
    this.cartProvider.add(this.formData).subscribe(
      response => {
        console.log(response);
        this.responseData = response;

        if (this.responseData.success && this.responseData.success != '') {
          this.success = this.responseData.success;
          this.alertProvider.title = 'Success';
          this.alertProvider.message = this.success;
          this.alertProvider.showAlert();
        }

        if (this.responseData.error && this.responseData.error != '') {
          if (this.responseData.error.store && this.responseData.error.store != '') {
            this.error_warning = this.responseData.error.store;
          }
          if (this.responseData.error.warning && this.responseData.error.warning != '') {
            this.error_warning = this.responseData.error.warning;
          }

          this.alertProvider.title = 'Warning';
          this.alertProvider.message = this.error_warning;
          this.alertProvider.showAlert();
        }

      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );

  }

  remove(data: any) {
    this.loadingProvider.present();
    this.wishlistProvider.removeWishlist(data.key).subscribe(
      response => {
        console.log(response);
        this.responseData = response;

        if (this.responseData.success && this.responseData.success != '') {
          this.success = this.responseData.success;
          this.alertProvider.title = 'Success';
          this.alertProvider.message = this.success;
          this.alertProvider.showAlert();
          this.getServerData();
        }

        if (this.responseData.error && this.responseData.error != '') {
          this.error_warning = this.responseData.error;

          this.alertProvider.title = 'Warning';
          this.alertProvider.message = this.error_warning;
          this.alertProvider.showAlert();
        }

      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );

  }

  isLogin() {
    this.status = true;
    this.customerProvider.getData()
      .then((data) => {
        if (!data) {
          this.navCtrl.push(CustomerLoginPage);
        }
        this.status = true;
      })
      .catch(e => {
        console.log(e);
        this.status = false;
      });

    return this.status;
  }

  viewProductDetail(data: any) {
    this.navCtrl.push(ProductPage, { product_id: data.product_id });
  }


}