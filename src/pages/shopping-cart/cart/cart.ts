import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartCustomerFormPage } from '../../shopping-cart/cart-customer-form/cart-customer-form';
import { CartEditFormPage } from '../../shopping-cart/cart-edit-form/cart-edit-form';
import { HomePage } from '../../home/home';

// providers
import { CartProvider } from '../../../providers/cart/cart';
import { OrderProvider } from '../../../providers/order/order';
import { CustomerProvider } from '../../../providers/customer/customer';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';
import { ToastProvider } from '../../../providers/toast/toast';
import { ModalProvider } from '../../../providers/modal/modal';
// pages
import { CustomerLoginPage } from '../../account/customer-login/customer-login';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public heading_title;
  public terms;
  public products;
  public totals;
  submitAttempt;

  public hasProducts: Boolean = false;

  cartForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  private cart_quantity = 1;
  private field_error = 'field is required';

  constructor(
    private cartProvider: CartProvider,
    private customerProvider: CustomerProvider,
    private orderProvider: OrderProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    public alertController: AlertController,
    public navCtrl: NavController,
    public modalProvider: ModalProvider
  ) {
    this.heading_title = 'My Shopping Cart';
    if (this.isLogin()) {
      this.getProducts();
    }
    this.createForm();
  }

  ionViewDidLoad() {

  }

  goBack() {
    this.navCtrl.pop();
  }

  isLogin() {
    this.status = true;
    this.customerProvider.getData()
      .then((data) => {
        if (!data) {
          this.navCtrl.push(CustomerLoginPage);
        }
        this.status = true;
      })
      .catch(e => {
        console.log(e);
        this.status = false;
      });

    return this.status;
  }


  public getProducts() {
    this.loadingProvider.present();
    this.cartProvider.products().subscribe(
      response => {
        if (response) {
          // console.log(response);
          this.products = response.products;
          this.totals = response.totals;

          if (this.products && this.products.length > 0) {
            this.hasProducts = true;
          } else {
            this.hasProducts = false;
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

  public remove(data) {
    this.loadingProvider.present();
    this.cartProvider.remove(data).subscribe(
      response => {
        console.log(response);
        this.getProducts();
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  createForm() {
    this.cartForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    });
  }

  save(data) {
    this.submitAttempt = true;

    if (this.cartForm.valid) {
      this.formData = {
        quantity: this.cartForm.value.quantity,
        cart_id: Number(data.cart_id)
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
          }

          if (this.responseData.error && this.responseData.error != '') {

            this.error_warning = this.responseData.error.store;

            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error_warning;
            this.alertProvider.showAlert();
          }

          this.getProducts();

        },
        err => console.error(err),
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }

  }

  goToCheckout() {
    var alert = this.alertController.create({
      title: 'Confirm',
      message: 'Do you want to continue?',
      buttons: [        
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: "Yes",
          handler: () => {
            this.navCtrl.push(CartCustomerFormPage);
          }
        }
      ]
    });

    alert.present();
  }

  public edit(data) {
    let param = { cart_id: data.cart_id };
    this.modalProvider.presentProfileModal(CartEditFormPage, param);

    this.modalProvider.modal.onDidDismiss(data => {
      this.getProducts();
    });
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
