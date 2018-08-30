import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';
import { AlertProvider } from '../../../providers/alert/alert';
import { CustomerProvider } from '../../../providers/customer/customer';
import { CustomerOrderViewPage } from '../customer-order-view/customer-order-view';
import { CustomerRequestPage } from '../customer-request/customer-request';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

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

  private redirecturl = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private customerProvider: CustomerProvider,
    private iab: InAppBrowser
  ) {
    this.heading_title = 'My Orders';
    this.isLogin();

    this.redirecturl = this.navParams.data.redirecturl;
    if (this.redirecturl) {
      this.Payment(this.redirecturl);
    }


    this.getServerData();
  }

  Payment(url) {
    if (url != '') {
      const option: InAppBrowserOptions = {
        zoom: 'no',
        hardwareback: 'yes',
        location: 'yes',
        toolbar: 'yes',
        footer: 'yes'
      }

      const browser = this.iab.create(url, '_self', option);
      browser.show();

    }
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
    
    if (!this.customerProvider.customer_id) {
      this.navCtrl.push(CustomerLoginPage);
    } 

  }

  viewDetail(data: any) {
    this.navCtrl.push(CustomerOrderViewPage, { order_id: data.order_id });
  }


  trackOrder(data: any) {
    if (data.trackurl != '') {
      const option: InAppBrowserOptions = {
        zoom: 'no',
        hardwareback: 'no',
        location: 'no',
        toolbar: 'no'
      }

      const browser = this.iab.create(data.trackurl, '_self', option);
      browser.show();
    }
  }


  cancelOrder(data: any) {
    var postData = {
      OrderRefNo: data.order_no,
      RequestType: 'Cancel'
    };
    this.navCtrl.push(CustomerRequestPage, postData);
  }

  refundOrder(data: any) {
    var postData = {
      OrderRefNo: data.order_no,
      RequestType: 'Refund'
    };
    this.navCtrl.push(CustomerRequestPage, postData);
  }

}
