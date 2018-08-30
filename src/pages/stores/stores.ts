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
import { StoresProvider } from '../../providers/stores/stores';

import { SocialSharingProvider } from '../../providers/social-sharing/social-sharing';

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };

  private message = 'We offer a wide range of mouth watering flavors of Namkeens, Parathas, Tea, Sweets, Wafers and many more items which reach to taste lovers in every nook and corner of India. The taste is luscious, products are fresh and enjoyable. With a motive to give people an exotic taste with freshness, hygiene and homelike quality, in a very short span of time, we have earned compliments for our quality products and timely services.';
  private subject = 'Order delicious food online from Miraj Online Store';
  private appimage = 'https://www.mirajonlinestore.com/app-content/images/logo.png';
  private url = 'https://www.mirajonlinestore.com/';

  public image;
  public store;
  public address;
  public geocode;
  public telephone;
  public fax;
  public open;
  public comment;
  public locations;

  // Stores from stores provider

  public stores;
  
  //  ---------------

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private addressProvider: AddressProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private followUsProvider: FollowUsProvider,
    private storesProvider: StoresProvider,
    private socialSharing: SocialSharingProvider
  ) {
    //this.getStoreData();
  }

  ionViewDidLoad() {
    // this.getData();
    this.getStoreData();
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

  getStoreData() {
    this.loadingProvider.present();
    this.storesProvider.getStores().subscribe(
      response => {
        this.stores = response;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  // New shocial sharing added on 28/08/2018
  regularShare() {
    this.socialSharing.message = this.message;
    this.socialSharing.subject = this.subject;
    this.socialSharing.image = this.appimage;
    this.socialSharing.url = this.url;
    this.socialSharing.share();
  }

  instagramShare() {
    this.socialSharing.appName = 'instagram';
    this.socialSharing.message = null;
    this.socialSharing.subject = null;
    this.socialSharing.image = null;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

  whatsappShare() {
    this.socialSharing.appName = 'whatsapp';
    this.socialSharing.message = this.message;
    this.socialSharing.subject = this.subject;
    this.socialSharing.image = this.appimage;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

  twitterShare() {
    this.socialSharing.appName = 'twitter';
    this.socialSharing.message = this.message;
    this.socialSharing.subject = this.subject;
    this.socialSharing.image = this.appimage;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

  facebookShare() {
    this.socialSharing.appName = 'facebook';
    this.socialSharing.message = null;
    this.socialSharing.subject = null;
    this.socialSharing.image = null;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

}
