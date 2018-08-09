import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';
import { AlertProvider } from '../../../providers/alert/alert';
import { CustomerProvider } from '../../../providers/customer/customer';
import { ProductPage } from '../../products/product/product';
@IonicPage()
@Component({
  selector: 'page-customer-order-view',
  templateUrl: 'customer-order-view.html',
})
export class CustomerOrderViewPage {
  public heading_title;
  public invoice_no;
  public order_id;
  public date_added;
  public payment_address;
  public payment_method;
  public shipping_address;
  public shipping_method;
  public products;
  public vouchers;
  public totals;
  public comment;
  public histories;
  private responseData;
  private success;
  private error_warning;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private customerProvider: CustomerProvider,
  ) {

    this.isLogin();
    this.order_id = this.navParams.data.order_id;
    this.getServerData();

    this.heading_title = 'Order Details';
  }

  ionViewDidLoad() {

  }

  goBack() {
    this.navCtrl.pop();
  }


  public getServerData() {
    this.loadingProvider.present();
    this.orderProvider.getOrderDetail(this.order_id).subscribe(
      response => {
        this.responseData = response;
        this.error_warning = this.responseData.error_warning;
        this.success = this.responseData.success;
        this.invoice_no = this.responseData.invoice_no;
        this.order_id = this.responseData.order_id;
        this.date_added = this.responseData.date_added;
        this.payment_address = this.responseData.payment_address;
        this.payment_method = this.responseData.payment_method;
        this.shipping_address = this.responseData.shipping_address;
        this.shipping_method = this.responseData.shipping_method;
        this.products = this.responseData.products;
        this.vouchers = this.responseData.vouchers;
        this.totals = this.responseData.totals;
        this.comment = this.responseData.comment;
        this.histories = this.responseData.histories;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  isLogin() {
    this.customerProvider.getData()
      .then((data) => {
        if (!data) {
          this.navCtrl.push(CustomerLoginPage);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  viewDetail(data: any) {
    this.navCtrl.push(ProductPage, { product_id: data.product_id });
  }



}
