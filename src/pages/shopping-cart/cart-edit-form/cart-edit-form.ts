import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProvider } from '../../../providers/cart/cart';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';
import { ModalProvider } from '../../../providers/modal/modal';
@IonicPage()
@Component({
  selector: 'page-cart-edit-form',
  templateUrl: 'cart-edit-form.html',
})
export class CartEditFormPage {
  public heading_title;
  submitAttempt;

  cartForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  private cart_quantity = 1;
  private field_error = 'field is required';
  private cart_id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private loadingProvider: LoadingProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    public modalProvider: ModalProvider,
  ) {
    this.heading_title = 'Edit your cart';
    this.createForm();
    if (navParams.get('cart_id')) {
      this.cart_id = navParams.get('cart_id');
    } else {
      this.cart_id = null;
    }
  }

  ionViewDidLoad() {
  }

  createForm() {
    this.cartForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    });
  }

  save() {
    this.submitAttempt = true;

    if (this.cartForm.valid) {
      this.formData = {
        quantity: this.cartForm.value.quantity,
        cart_id: Number(this.cart_id)
      };

      this.loadingProvider.present();
      this.cartProvider.edit(this.formData).subscribe(
        response => {

          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.cartForm.reset();
            this.submitAttempt = false;
            this.dismiss();
          }

          if (this.responseData.error && this.responseData.error != '') {

            this.error_warning = this.responseData.error.store;

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

  dismiss() {
    this.modalProvider.dismiss();
  }


}
