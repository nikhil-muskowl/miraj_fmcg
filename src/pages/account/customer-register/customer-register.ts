import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactValidator } from '../../../validators/contact';
import { CustomerProvider } from '../../../providers/customer/customer';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-customer-register',
  templateUrl: 'customer-register.html',
})
export class CustomerRegisterPage {
  public heading_title;
  submitAttempt;
  registerForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  // variables 
  private customer_id;
  private text_message;

  // errors
  private error_fullname = 'field is required';
  private error_username = 'field is required';
  private error_email = 'field is required';
  private error_telephone = 'field is required';
  private error_password = 'field is required';
  private error_confirm = 'field is required';
  private error_warning = 'You must agree to the Privacy Policy!';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {
    this.heading_title = 'Register With Us';
    this.createForm();
  }

  goBack() {
    this.navCtrl.pop();
  }

  
  ionViewDidLoad() {

  }

  save() {
    this.submitAttempt = true;
    if (this.registerForm.valid) {
      this.loadingProvider.present();

      this.formData = this.registerForm.valid;

      this.customerProvider.apiRegister(this.registerForm.value).subscribe(
        response => {
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.customer_id) {
            this.customer_id = this.responseData.customer_id;
            this.registerForm.reset();
            this.submitAttempt = false;
          }

          if (this.responseData.text_message != '') {
            this.text_message = this.responseData.text_message;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.text_message;
            this.alertProvider.showAlert();
          }

          if (this.responseData.error_fullname != '') {
            this.registerForm.controls['fullname'].setErrors({ 'incorrect': true });
            this.error_fullname = this.responseData.error_fullname;
          }

          if (this.responseData.error_username != '') {
            this.registerForm.controls['username'].setErrors({ 'incorrect': true });
            this.error_username = this.responseData.error_username;
          }

          if (this.responseData.error_email != '') {
            this.registerForm.controls['email'].setErrors({ 'incorrect': true });
            this.error_email = this.responseData.error_email;
          }

          if (this.responseData.error_telephone != '') {
            this.registerForm.controls['telephone'].setErrors({ 'incorrect': true });
            this.error_telephone = this.responseData.error_telephone;
          }

          if (this.responseData.error_password != '') {
            this.registerForm.controls['password'].setErrors({ 'incorrect': true });
            this.error_password = this.responseData.error_password;
          }

          if (this.responseData.error_confirm != '') {
            this.registerForm.controls['confirm'].setErrors({ 'incorrect': true });
            this.error_confirm = this.responseData.error_confirm;
          }

          if (this.responseData.error_warning && this.responseData.error_warning != '') {
            this.error_warning = this.responseData.error_warning;

            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error_warning;
            this.alertProvider.showAlert();
          }

        },
        err => {
          console.error(err);
          this.loadingProvider.dismiss();
        },
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }

  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(32), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      telephone: ['', ContactValidator.isValid],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }


}
