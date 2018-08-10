import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// providers
import { CartProvider } from '../../../providers/cart/cart';
import { OrderProvider } from '../../../providers/order/order';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';
import { CartSuccessPage } from '../cart-success/cart-success';

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  public heading_title;

  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  public products;
  public totals;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private orderProvider: OrderProvider,
    private loadingProvider: LoadingProvider,
    public alertProvider: AlertProvider,
  ) {
    this.heading_title = 'Confirm Your Order';
    this.getProducts();
  }

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }

  public getProducts() {
    this.loadingProvider.present();
    this.cartProvider.products().subscribe(
      response => {
        // console.log(response);
        this.products = response.products;
        this.totals = response.totals;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }


  saveOrder() {
    this.loadingProvider.present();
    this.orderProvider.addOrder().subscribe(
      response => {
        this.responseData = response;
        if (this.responseData.success && this.responseData.success != '') {
          this.success = this.responseData.success;
          this.alertProvider.title = 'Success';
          this.alertProvider.message = this.success;
          this.alertProvider.showAlert();
          this.navCtrl.push(CartSuccessPage, { redirecturl: this.responseData.redirecturl });
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


}
