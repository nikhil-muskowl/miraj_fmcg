import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';

import { CustomerAccountPage } from '../customer-account/customer-account';

@IonicPage()
@Component({
  selector: 'page-customer-request',
  templateUrl: 'customer-request.html',
})
export class CustomerRequestPage {
  public heading_title;
  private OrderRefNo;
  private Reason;
  private RequestType;

  submitAttempt;
  requestForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  private errorReason = 'field is required';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private loadingProvider: LoadingProvider,
    private orderProvider: OrderProvider,
    public alertProvider: AlertProvider,
  ) {
    this.heading_title = 'Send Request';

    this.OrderRefNo = this.navParams.data.OrderRefNo;
    this.RequestType = this.navParams.data.RequestType;
    console.log(this.navParams);
    this.createForm();
  }

  createForm() {
    this.requestForm = this.formBuilder.group({
      Reason: [this.Reason, Validators.required]
    });
  }


  save() {
    this.submitAttempt = true;


    if (this.requestForm.valid) {
      this.loadingProvider.present();

      this.formData = {
        OrderRefNo: this.OrderRefNo,
        RequestType: this.RequestType,
        Reason: this.requestForm.value.Reason
      };

      this.orderProvider.setRequest(this.formData).subscribe(
        response => {
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.requestForm.reset();
            this.submitAttempt = false;
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
          
            this.alertProvider.showAlert();
            this.navCtrl.setRoot(CustomerAccountPage);
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

  ionViewDidLoad() {

  }

  goBack() {
    this.navCtrl.pop();
  }

}
