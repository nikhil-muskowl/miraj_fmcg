import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';

@IonicPage()
@Component({
  selector: 'page-customer-requests',
  templateUrl: 'customer-requests.html',
})
export class CustomerRequestsPage {
  public heading_title = 'My Requests';
  private responseData;
  private requests;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private orderProvider: OrderProvider,
    public alertProvider: AlertProvider,
  ) {
    this.getServerData();
  }

  public getServerData() {
    this.loadingProvider.present();
    this.orderProvider.getRequests().subscribe(
      response => {
        this.requests = response;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }


  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }



}
