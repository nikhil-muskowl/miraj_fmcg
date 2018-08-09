import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
import { InformationProvider } from '../../../providers/information/information';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ContactValidator } from '../../../validators/contact';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  public heading_title;
  submitAttempt;
  contactForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;


  private success;
  private error;


  public name = '';
  public email = '';
  public mobile = '';
  public enquiry = '';


  // errors
  private error_name = 'field is required';
  private error_enquiry = 'field is required';
  private error_email = 'field is required';
  private error_mobile = 'field is required';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    private informationProvider: InformationProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {

    this.heading_title = 'Contact Us';

    this.name = this.customerProvider.fullname;
    this.email = this.customerProvider.email;
    this.mobile = this.customerProvider.telephone;
    this.enquiry = '';

    this.createForm();
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  createForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      mobile: ['', ContactValidator.isValid],
      enquiry: ['', Validators.required],
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.contactForm.valid) {
      this.loadingProvider.present();

      this.formData = this.contactForm.valid;

      this.informationProvider.send(this.contactForm.value).subscribe(
        response => {
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.submitAttempt = false;
            this.contactForm.reset();
          }

          if (this.responseData.error_name != '') {
            this.contactForm.controls['name'].setErrors({ 'incorrect': true });
            this.error_name = this.responseData.error_name;
          }

          if (this.responseData.error_email != '') {
            this.contactForm.controls['email'].setErrors({ 'incorrect': true });
            this.error_email = this.responseData.error_email;
          }

          if (this.responseData.error_mobile != '') {
            this.contactForm.controls['mobile'].setErrors({ 'incorrect': true });
            this.error_mobile = this.responseData.error_mobile;
          }

          if (this.responseData.error_enquiry != '') {
            this.contactForm.controls['enquiry'].setErrors({ 'incorrect': true });
            this.error_enquiry = this.responseData.error_enquiry;
          }


          if (this.responseData.error && this.responseData.error != '') {
            this.error = this.responseData.error;

            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error;
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

  ionViewDidLoad() {

  }


}
