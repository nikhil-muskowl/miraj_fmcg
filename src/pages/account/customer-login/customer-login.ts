import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// pages
import { CustomerRegisterPage } from '../customer-register/customer-register';
import { CustomerAccountPage } from '../customer-account/customer-account';
// providers
import { CustomerProvider } from '../../../providers/customer/customer';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CustomerModel } from '../../../models/customer-model';

@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {
  public heading_title;
  public customerModel = new CustomerModel();

  submitAttempt;
  loginForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  private error_email = 'field is required';
  private error_password = 'field is required';
  private success;
  private error_warning;

  public customer;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,

  ) {
    this.heading_title = 'Login';
    this.isLogin();
    this.createForm();
  }

  goBack() {
    this.navCtrl.pop();
  }


  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoginPage');
    this.isLogin();
  }

  goToRegsiter() {
    this.navCtrl.push(CustomerRegisterPage);
  }

  save() {

    this.submitAttempt = true;
    this.formData = this.loginForm.valid;

    if (this.loginForm.valid) {

      this.loadingProvider.present();

      this.customerProvider.apiLogin(this.loginForm.value).subscribe(
        response => {
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.login) {

            this.loginForm.reset();
            this.submitAttempt = false;
           
           
            this.customerProvider.setData(this.responseData.data);
            
            if (this.responseData.success && this.responseData.success != '') {

              this.success = this.responseData.success;
              this.alertProvider.title = 'Success';
              this.alertProvider.message = this.success;
              this.alertProvider.showAlert();
            }

           
            this.navCtrl.setRoot(CustomerAccountPage);
            //this.navCtrl.push(CustomerAccountPage);

          }



          if (this.responseData.error_warning && this.responseData.error_warning != '') {
            this.error_warning = this.responseData.error_warning;

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

  isLogin() {
    if (this.customerProvider.customer_id) {
      this.navCtrl.push(CustomerAccountPage);
    }

  }
}
