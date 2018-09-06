import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../../providers/alert/alert';
import { AddressProvider } from '../../../providers/address/address';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ShippingAddressPage } from '../shipping-address/shipping-address';
import { OrderProvider } from '../../../providers/order/order';
import { CustomerProvider } from '../../../providers/customer/customer';

@IonicPage()
@Component({
  selector: 'page-payment-address',
  templateUrl: 'payment-address.html',
})
export class PaymentAddressPage {
  private heading_title = 'Billing Address';

  // list
  public districts;
  private countries;
  private zones;

  // form fields  
  private address;
  private postcode;
  private city;
  private country_id = 1;
  private district_id = 1;
  private zone_id = 1;

  // errors
  private field_error = 'field is required';
  private error_address = 'field is required';
  private error_district_id = 'field is required';
  private error_zone_id = 'field is required';
  private error_postcode = 'field is required';
  private error_city = 'field is required';

  private success;
  private error_warning;
  // form data
  submitAttempt;
  addressForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private addressProvider: AddressProvider,
    public formBuilder: FormBuilder,
    private orderProvider: OrderProvider,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {

    this.zone_id = this.customerProvider.zone_id;
    this.district_id = this.customerProvider.district_id;
    this.postcode = this.customerProvider.postcode;
    this.city = this.customerProvider.city;
    this.address = this.customerProvider.address;


    this.getCountry();
    this.getZone(this.country_id);
    this.getDistrict(this.zone_id);
    this.createForm();
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
  }


  createForm() {
    this.addressForm = this.formBuilder.group({
      address: [this.address, Validators.required],
      postcode: [this.postcode, Validators.required],
      city: [this.city, Validators.required],
      district_id: [this.district_id, Validators.required],
      zone_id: [this.zone_id, Validators.required],
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.addressForm.valid) {
      this.formData = this.addressForm.value;
      this.loadingProvider.present();
      this.orderProvider.setPaymentData(this.formData);
      this.orderProvider.setShippingData(this.formData);
      this.navCtrl.push(ShippingAddressPage);
      this.loadingProvider.dismiss();
    }
  }


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
