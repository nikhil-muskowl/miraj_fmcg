import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';
import { AlertProvider } from '../../../providers/alert/alert';
import { CustomerProvider } from '../../../providers/customer/customer';
import { CustomerOrderViewPage } from '../customer-order-view/customer-order-view';
import { CustomerRequestPage } from '../customer-request/customer-request';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CustomerAccountPage } from '../customer-account/customer-account';

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

  public pagination;
  public sorts;
  public limits;
  public order_id;
  public rateValue;
  public filterData;
  public sort;
  public order;
  public limit;
  public page = 1;
  public isInfinite = true;
  public orderModel: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private customerProvider: CustomerProvider,
    private iab: InAppBrowser, 
    public platform: Platform
  ) {
    this.heading_title = 'My Orders';
    this.isLogin();

    this.redirecturl = this.navParams.data.redirecturl;
    if (this.redirecturl) {
      this.Payment(this.redirecturl);
    }

    // Added on 10/09/2018 to handel user chabge password Page hardware back button 
    platform.registerBackButtonAction(() => {
      this.navCtrl.push(CustomerAccountPage);
    });
  }

  Payment(url) {
    if (url != '') {
      const option: InAppBrowserOptions = {
        zoom: 'no',
        hardwareback: 'yes',
        location: 'no',
        toolbar: 'yes',
        footer: 'yes'
      }

      const browser = this.iab.create(url, '_self', option);
      browser.show();

    }
  }

  goBack() {
    //this.navCtrl.pop();
    this.navCtrl.setRoot(CustomerAccountPage);
  }

  // ionViewDidLoad() {
  //   this.getServerData();
  // }

  // This is added to refresh the page agter loading.
  ionViewWillEnter(){
    this.getServerData();
  }

  public getServerData() {
    this.filterData = {
      'page': this.page,
      'order_id': this.order_id,
      'limit': this.limit,
      'sort': this.sort,
      'order': this.order
    };
    this.loadingProvider.present();
    this.orderProvider.getOrders(this.filterData).subscribe(
      response => {
        this.responseData = response;
        this.orders = this.responseData.orders;
        this.pagination = this.responseData.pagination;
        this.sorts = this.responseData.sorts;
        this.limits = this.responseData.limits;
        //console.log(this.responseData);
        this.binddata();
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  binddata() {
    for (let index = 0; index < this.orders.length; index++) {
      this.orderModel.push({
        order_id: this.orders[index].order_id,
        order_no: this.orders[index].order_no,
        name: this.orders[index].name,
        status: this.orders[index].status,
        date_added: this.orders[index].date_added,
        products: this.orders[index].products,
        total: this.orders[index].total,
        paymenturl: this.orders[index].paymenturl,
        trackurl: this.orders[index].trackurl,
        iscancel: this.orders[index].iscancel,
        isrefund: this.orders[index].isrefund,
        reorder: this.orders[index].reorder

      });
      //console.log(this.orderModel);
    }
  }

  doInfinite(infiniteScroll) {
    if (this.orders.length > 0 && this.pagination.length != this.page) {
      this.page++;
      this.getServerData();
      this.isInfinite = true;
    } else {
      this.isInfinite = false;
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
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

  paymentOrder(data: any) {
    if (data.paymenturl != '') {
      const option: InAppBrowserOptions = {
        zoom: 'no',
        hardwareback: 'yes',
        location: 'no',
        toolbar: 'yes',
        footer: 'yes'
      }

      this.platform.ready().then(() => {
        const browser = this.iab.create(data.paymenturl, '_self', option);
        browser.show();

        browser.on('exit').subscribe(() => {
          this.getServerData();
          //this.navCtrl.setRoot(CustomerOrderPage);
        }, err => 
            console.error(err));
       // });
    
        this.platform.registerBackButtonAction(() => {
         
          this.navCtrl.setRoot(CustomerOrderPage);
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
       });
    });

    }
  }

}
