import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductProvider } from '../../../providers/product/product';
import { CartProvider } from '../../../providers/cart/cart';
import { WishlistProvider } from '../../../providers/wishlist/wishlist';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';

import { CartPage } from '../../shopping-cart/cart/cart';
import { SearchProductsPage } from '../../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../../providers/follow-us/follow-us';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public product_id: number;
  public heading_title;
  public manufacturer;
  public description;
  public stock;
  public price;
  public discountrate;
  public mrp;
  public rating;
  public popup;
  public productdetaillist;
  public images;
  public detail_id = null;

  submitAttempt;
  cartForm: FormGroup;
  private formData: any;
  private cart_quantity = 1;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  private field_error = 'field is required';


  private review_tab: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private cartProvider: CartProvider,
    private wishlistProvider: WishlistProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider,
    private alertCtrl: AlertController,
    private followUsProvider: FollowUsProvider,
  ) {
    this.product_id = this.navParams.data.product_id;
    this.getServerData();
    this.createForm();

  }

  goBack() {
    this.navCtrl.pop();
  }

  public getServerData() {
    this.loadingProvider.present();
    this.productProvider.product(this.product_id).subscribe(
      response => {
        this.heading_title = response.heading_title;
        this.description = response.description;
        this.manufacturer = response.manufacturer;
        this.stock = response.stock;
        this.price = response.price;
        this.discountrate = response.discountrate;
        this.mrp = response.mrp;
        this.rating = response.rating;
        this.popup = response.popup;
        this.images = response.images;
        this.productdetaillist = response.productdetaillist;
        this.detail_id = this.productdetaillist[0].product_detail_id;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  ionViewWillEnter() {
    this.review_tab = 'description';
  }

  ionViewDidLoad() {
  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  createForm() {
    this.cartForm = this.formBuilder.group({
      detail_id: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  save() {
    this.submitAttempt = true;

    if (this.cartForm.valid) {
      this.formData = {
        quantity: this.cartForm.value.quantity,
        detail_id: this.cartForm.value.detail_id,
        product_id: Number(this.product_id)
      };
      this.loadingProvider.present();
      this.cartProvider.add(this.formData).subscribe(
        response => {
          console.log(response);
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.showConfirm();
            this.submitAttempt = false;
          }

          if (this.responseData.error && this.responseData.error != '') {
            this.error_warning = this.responseData.error;
            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error_warning;
            this.alertProvider.showAlert();
            this.submitAttempt = false;
          }

        },
        err => console.error(err),
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }

  }

  addWishlist() {

    this.submitAttempt = true;

    if (this.cartForm.valid) {
      this.formData = {
        quantity: this.cartForm.value.quantity,
        detail_id: this.cartForm.value.detail_id,
        product_id: Number(this.product_id)
      };
      this.loadingProvider.present();
      this.wishlistProvider.addWishlist(this.formData).subscribe(
        response => {
          console.log(response);
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.submitAttempt = false;
          }

          if (this.responseData.error && this.responseData.error != '') {
            this.error_warning = this.responseData.error;
            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error_warning;
            this.alertProvider.showAlert();
            this.submitAttempt = false;
          }

        },
        err => console.error(err),
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }


  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Success',
      message:  this.success,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Goto cart',
          handler: () => {
            //console.log('Agree clicked');
            //this.navcontroller.setRoot(CartPage);
            this.navCtrl.push(CartPage);
          }
        }
      ]
    });
    confirm.present();
  }

  goToSearch() {
    this.navCtrl.push(SearchProductsPage);
  }

  goTocart() {
    this.navCtrl.push(CartPage);
  }

  presentActionSheet() {
    this.followUsProvider.presentActionSheet();
  }

}
