import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
import { OrderProvider } from '../../../providers/order/order';
import { AlertProvider } from '../../../providers/alert/alert';
import { ContactValidator } from '../../../validators/contact';
import { LoadingProvider } from '../../../providers/loading/loading';
import { PaymentAddressPage } from '../payment-address/payment-address';

@IonicPage()
@Component({
  selector: 'page-cart-customer-form',
  templateUrl: 'cart-customer-form.html',
})
export class CartCustomerFormPage {
  public heading_title;


  submitAttempt;
  cartCustomerForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;

  // errors
  private error_fullname = 'field is required';
  private error_email = 'field is required';
  private error_mobile = 'field is required';
  private error_warning;

  // variables 
  private customer_id;
  private fullname;
  private email;
  private mobile;
  private ImmediateShipping;
  private text_message;

  public isImidiateShipping = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    private orderProvider: OrderProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {

    this.heading_title = 'Fill form for proceed order';

    var data = {
      customer_id: this.customerProvider.customer_id,
      fullname: this.customerProvider.fullname,
      email: this.customerProvider.email,
      mobile: this.customerProvider.telephone,
    };

    this.orderProvider.setCustomerData(data);

    this.fullname = this.orderProvider.fullname;
    this.email = this.orderProvider.email;
    this.mobile = this.orderProvider.mobile;
    this.ImmediateShipping = this.orderProvider.ImmediateShipping;

    this.createForm();
    this.checkImidiateShipping();
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
  }


  createForm() {
    this.cartCustomerForm = this.formBuilder.group({
      fullname: [this.fullname, Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      mobile: [this.mobile, ContactValidator.isValid],
      ImmediateShipping: [this.ImmediateShipping, Validators.required]
    });
  }

  public checkCheckbox($event) {
    if (!$event.checked) {
      this.orderProvider.ImmediateShipping = false;
    } else {
      this.orderProvider.ImmediateShipping = true;
    }
  }

  save() {
    this.submitAttempt = true;
    if (this.cartCustomerForm.valid) {
      this.formData = this.cartCustomerForm.value;
      this.loadingProvider.present();
      this.orderProvider.setCustomerData(this.formData);
      this.loadingProvider.dismiss();
      this.navCtrl.push(PaymentAddressPage);
    }
  }

  public checkImidiateShipping() {
    this.loadingProvider.present();
    this.orderProvider.checkImidiateShipping().subscribe(
      response => {
        if (response) {
          this.responseData = response;
          if (this.responseData.ImidiateShipping == true) {
            this.isImidiateShipping = true;
          } else {
            this.isImidiateShipping = false;
          }
        }
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

}
