import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';
import { HomeProvider } from '../../providers/home/home';

import { CustomerAccountPage } from '../../pages/account/customer-account/customer-account';
import { CartPage } from '../../pages/shopping-cart/cart/cart';
import { CustomerWishlistPage } from '../../pages/account/customer-wishlist/customer-wishlist';
import { SearchProductsPage } from '../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../providers/follow-us/follow-us';

import { CategoryProductsPage } from '../products/category-products/category-products';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';

// This is added on 10/09/2018 for follow-us functionality
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

import { NetworkProvider } from '../../providers/network/network';

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
    public platform: Platform,
    private iab: InAppBrowser,
    private appAvailability: AppAvailability,
    public networkProvider: NetworkProvider,
  ) {
    this.showSearchbar = false;
    //this.gethomepageData();
  }

  ionViewWillEnter(){
    //this.gethomepageData();
    this.platform.ready().then(() => {
      this.gethomepageData();
    })
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
      err =>console.error(err),
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

  getCategoryDetail(data: any) {
    this.navCtrl.push(CategoryProductsPage, { category_id: data.category_id });
  }

   // Added on 07/09/2018 for Follow Us on Socials

  followFacebook(){
    this.launchExternalApp('fb://', 'com.facebook.android', 'fb://profile/', 'https://www.facebook.com/', 'mirajfmcg');
  }

  followInstagram(){
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'http://instagram.com/', 'miraj_fmcg/');
  }


  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;

    if (this.platform.is('ios')) {
      app = iosSchemaName;
    } else if (this.platform.is('android')) {
      app = androidPackageName;
    } else {
      let browser = this.iab.create(httpUrl + username, '_system');
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => { // success callback
        let browser = this.iab.create(appUrl + username, '_system');
      },
      (no: boolean) => { // error callback
        let browser = this.iab.create(httpUrl + username, '_system');
      }
    );

  }
}