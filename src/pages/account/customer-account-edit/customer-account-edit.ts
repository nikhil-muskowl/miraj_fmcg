import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactValidator } from '../../../validators/contact';
import { CustomerProvider } from '../../../providers/customer/customer';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { AddressProvider } from '../../../providers/address/address';

// Added on 10/09/2018 to handel user edit account hardware back button 
import { CustomerAccountPage } from '../customer-account/customer-account';

@IonicPage()
@Component({
  selector: 'page-customer-account-edit',
  templateUrl: 'customer-account-edit.html',
})
export class CustomerAccountEditPage {
  public heading_title;
  submitAttempt;
  accountForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  private success;
  private error;

  // list
  public districts;
  private countries;
  private zones;
  // form fields  
  public fullname = '';
  public lastname = '';
  public email = '';
  public telephone = '';
  private dob ='';
  private gender = '';
  private address;
  private postcode;
  private city;
  private country_id = 1;
  private district_id = 1;
  private zone_id = 1;

  private maxDate: string;

  // errors
  private error_fullname = 'field is required';
  private error_lastname = 'field is required';
  private error_email = 'field is required';
  private error_telephone = 'field is required';
  private error_dob = 'field is required';
  private error_gender = 'field is required';
  private error_address = 'field is required';
  private error_country_id = 'field is required';
  private error_district_id = 'field is required';
  private error_zone_id = 'field is required';
  private error_postcode = 'field is required';
  private error_city = 'field is required';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    private addressProvider: AddressProvider,
    private platform: Platform
  ) {

    this.heading_title = 'Edit Account Details';
    this.fullname = this.customerProvider.fullname;
    this.email = this.customerProvider.email;
    this.telephone = this.customerProvider.telephone;
    this.dob = this.customerProvider.dob;
    this.gender = this.customerProvider.gender;
    this.zone_id = this.customerProvider.zone_id;
    this.district_id = this.customerProvider.district_id;
    this.postcode = this.customerProvider.postcode;
    this.city = this.customerProvider.city;
    this.address = this.customerProvider.address;

    this.getCountry();
    this.getZone(this.country_id);
    this.getDistrict(this.zone_id);
    this.createForm();

    // Added on 10/09/2018 to handel user edit account hardware back button 
    platform.registerBackButtonAction(() => {
      this.navCtrl.push(CustomerAccountPage);
    });
  } @ViewChild('datePicker') datePicker;
  open() {
      if (!this.dob) {
          this.dob = new Date().toJSON().split('T')[0];
          setTimeout(() => {
              this.datePicker.open();
          }, 50)
      } else {
          this.datePicker.open();
      }

  }

  goBack() {
    this.navCtrl.pop();
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      fullname: [this.fullname, Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      telephone: [this.telephone, ContactValidator.isValid],
      dob: [this.dob, Validators.required],
      gender: [this.gender, Validators.required],
      country_id: [this.country_id, Validators.required],
      zone_id: [this.zone_id, Validators.required],
      district_id: [this.district_id, Validators.required],
      postcode: [this.postcode, Validators.required],
      city: [this.city, Validators.required],
      address: [this.address, Validators.required],
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.accountForm.valid) {
      this.loadingProvider.present();

      this.formData = this.accountForm.valid;

      this.customerProvider.changeAccountData(this.accountForm.value).subscribe(
        response => {
          this.responseData = response;
          this.submitAttempt = true;
          console.log(this.responseData);
          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.logout();
          }

          if (this.responseData.error_fullname != '') {
            this.accountForm.controls['fullname'].setErrors({ 'incorrect': true });
            this.error_fullname = this.responseData.error_fullname;
          }

          if (this.responseData.error_email != '') {
            this.accountForm.controls['email'].setErrors({ 'incorrect': true });
            this.error_email = this.responseData.error_email;
          }

          if (this.responseData.error_telephone != '') {
            this.accountForm.controls['telephone'].setErrors({ 'incorrect': true });
            this.error_telephone = this.responseData.error_telephone;
          }

          if (this.responseData.error_dob != '') {
            this.accountForm.controls['dob'].setErrors({ 'incorrect': true });
            this.error_dob = this.responseData.error_dob;
          }

          if (this.responseData.error_gender != '') {
            this.accountForm.controls['gender'].setErrors({ 'incorrect': true });
            this.error_gender = this.responseData.error_gender;
          }

          if (this.responseData.error_country_id != '') {
            this.accountForm.controls['country_id'].setErrors({ 'incorrect': true });
            this.error_country_id = this.responseData.error_country_id;
          }

          if (this.responseData.error_zone_id != '') {
            this.accountForm.controls['zone_id'].setErrors({ 'incorrect': true });
            this.error_zone_id = this.responseData.error_zone_id;
          }

          if (this.responseData.error_district_id != '') {
            this.accountForm.controls['district_id'].setErrors({ 'incorrect': true });
            this.error_district_id = this.responseData.error_district_id;
          }

          if (this.responseData.error_postcode != '') {
            this.accountForm.controls['postcode'].setErrors({ 'incorrect': true });
            this.error_postcode = this.responseData.error_postcode;
          }

          if (this.responseData.error_city != '') {
            this.accountForm.controls['city'].setErrors({ 'incorrect': true });
            this.error_city = this.responseData.error_city;
          }

          if (this.responseData.error_address != '') {
            this.accountForm.controls['address'].setErrors({ 'incorrect': true });
            this.error_address = this.responseData.error_address;
          }


          if (this.responseData.error_warning && this.responseData.error_warning != '') {
            this.error = this.responseData.error_warning;

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


  logout() {
    this.customerProvider.unSetData();
    this.navCtrl.push(CustomerLoginPage);
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

  public getCountry() {
    this.loadingProvider.present();
    this.addressProvider.getCountry().subscribe(
      response => {
        this.countries = response.addresses;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public getZone(country_id) {
    this.country_id = country_id;
    this.loadingProvider.present();
    this.addressProvider.getZone(this.country_id).subscribe(
      response => {
        this.zones = response.zone;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public getDistrict(zone_id) {
    this.zone_id = zone_id;
    this.loadingProvider.present();
    this.addressProvider.getDistrict(this.zone_id).subscribe(
      response => {
        this.districts = response.district;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }
}
