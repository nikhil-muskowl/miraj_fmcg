import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// providers
import { CustomerProvider } from '../../../providers/customer/customer';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CustomerLoginPage } from '../customer-login/customer-login';
@IonicPage()
@Component({
  selector: 'page-customer-change-password',
  templateUrl: 'customer-change-password.html',
})
export class CustomerChangePasswordPage {
  public heading_title;
  submitAttempt;
  passwordForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  private error_password = 'field is required';
  private error_confirm = 'field is required';
  private error_currentpassword = 'field is required';
  private success;
  private error;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {
    this.heading_title='Update Password';
    this.createForm();
  }
  goBack() {
    this.navCtrl.pop();
  }
  createForm() {
    this.passwordForm = this.formBuilder.group({
      currentpassword: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  save() {
    this.submitAttempt = true;
    this.formData = this.passwordForm.valid;

    if (this.passwordForm.valid) {
      this.loadingProvider.present();
      this.customerProvider.changePassword(this.passwordForm.value).subscribe(
        response => {
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '' && this.responseData.success != null) {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.passwordForm.reset();
            this.submitAttempt = false;

            this.logout();
          }

          if (this.responseData.error && this.responseData.error != '' && this.responseData.error == null) {
            this.error = this.responseData.error;
            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error;
            this.alertProvider.showAlert();
          }

          if (this.responseData.error_currentpassword != '') {
            this.passwordForm.controls['currentpassword'].setErrors({ 'incorrect': true });
            this.error_currentpassword = this.responseData.error_currentpassword;
          }

          if (this.responseData.error_password != '') {
            this.passwordForm.controls['password'].setErrors({ 'incorrect': true });
            this.error_password = this.responseData.error_password;
          }

          if (this.responseData.error_confirm != '') {
            this.passwordForm.controls['confirm'].setErrors({ 'incorrect': true });
            this.error_confirm = this.responseData.error_confirm;
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

  // logout() {
  //   this.customerProvider.unSetData()
  //     .then((data) => {
  //       if (data) {
  //         this.navCtrl.push(CustomerLoginPage);
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  logout() {
    this.customerProvider.unSetData();
    this.navCtrl.push(CustomerLoginPage);
  }


}
