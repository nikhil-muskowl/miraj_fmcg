import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { HomePage } from '../../pages/home/home';
import { CustomerAccountPage } from '../../pages/account/customer-account/customer-account';
import { CartPage } from '../../pages/shopping-cart/cart/cart';
import { CustomerWishlistPage } from '../../pages/account/customer-wishlist/customer-wishlist';
import { SearchProductsPage } from '../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../providers/follow-us/follow-us';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };


  public image;
  public store;
  public address;
  public geocode;
  public telephone;
  public fax;
  public open;
  public comment;
  public locations;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private addressProvider: AddressProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private followUsProvider: FollowUsProvider,
  ) {
  }

  ionViewDidLoad() {
    // this.getData();
  }

  public getData() {
    this.loadingProvider.present();
    this.addressProvider.getStores().subscribe(
      response => {
        // console.log(response);
        this.image = response.image;
        this.store = response.store;
        this.address = response.address;
        this.geocode = response.geocode;
        this.telephone = response.telephone;
        this.fax = response.fax;
        this.open = response.open;
        this.comment = response.comment;
        this.locations = response.locations;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  presentActionSheet() {
    this.followUsProvider.presentActionSheet();
  }

  goToAccount() {
    this.navCtrl.push(CustomerAccountPage);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goTocart() {
    this.navCtrl.push(CartPage);
  }

  goToWishlist() {
    this.navCtrl.push(CustomerWishlistPage);
  }

  goToSearch() {
    this.navCtrl.push(SearchProductsPage);
  }

}
