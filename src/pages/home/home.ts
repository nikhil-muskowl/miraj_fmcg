import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';
import { HomeProvider } from '../../providers/home/home';

import { CustomerAccountPage } from '../../pages/account/customer-account/customer-account';
import { CartPage } from '../../pages/shopping-cart/cart/cart';
import { CustomerWishlistPage } from '../../pages/account/customer-wishlist/customer-wishlist';
import { SearchProductsPage } from '../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../providers/follow-us/follow-us';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  public showSearchbar: boolean = false;
  public data;
  public sliders;
  public sliderChild;
  public deals;
  public dealChild;
  public ban1;
  public ban1Child;
  public ban2;
  public ban2Child;
  public ban3;
  public ban3Child;
  public hzBan1;
  public hzBan1Child;
  public hzBan2;
  public hzBan2Child;
  public vdBan;
  public vdBanChild;

  constructor(
    public navCtrl: NavController,
    public loadingProvider: LoadingProvider,
    public Home: HomeProvider,
    private followUsProvider: FollowUsProvider,
  ) {
    this.showSearchbar = false;
    this.gethomepageData();
  }

  public toggleSearchbar(): void {
    this.showSearchbar = this.showSearchbar ? false : true;
  }

  gethomepageData() {
    this.loadingProvider.present();

    this.Home.gethomepageImages().subscribe(
      response => {
        this.data = response;
        this.sliders = this.data.Mobile_Slider;
        this.sliderChild = this.sliders.children;
        this.deals = this.data.Deal_Of_Day;
        this.dealChild = this.deals.children;
        this.ban1 = this.data.Square_Banner_1;
        this.ban1Child = this.ban1.children;
        this.ban2 = this.data.Square_Banner_2;
        this.ban2Child = this.ban2.children;
        this.ban3 = this.data.Square_Banner_3;
        this.ban3Child = this.ban3.children;
        this.hzBan1 = this.data.horizontal_Banner_1;
        this.hzBan1Child = this.hzBan1.children;
        this.hzBan2 = this.data.horizontal_Banner_2;
        this.hzBan2Child = this.hzBan2.children;
        this.vdBan = this.data.Video_Banner;
        this.vdBanChild = this.vdBan.children;
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