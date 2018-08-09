import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';
import { AlertProvider } from '../../../providers/alert/alert';
import { CustomerProvider } from '../../../providers/customer/customer';
import { CustomerOrderViewPage } from '../customer-order-view/customer-order-view';
@IonicPage()
@Component({
  selector: 'page-customer-order',
  templateUrl: 'customer-order.html',
})
export class CustomerOrderPage {
  public orders;
  private formData: any;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  public heading_title;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private customerProvider: CustomerProvider,
  ) {
    this.heading_title = 'My Orders';
    this.isLogin();
    this.getServerData();
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

  }

  public getServerData() {
    this.loadingProvider.present();
    this.orderProvider.getOrders().subscribe(
      response => {
        this.responseData = response;
        this.orders = this.responseData.orders;
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
    this.navCtrl.push(CustomerOrderViewPage, { order_id: data.order_id });
  }
}
