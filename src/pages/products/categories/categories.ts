import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product';
import { CategoryProductsPage } from '../category-products/category-products';
import { LoadingProvider } from '../../../providers/loading/loading';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HomePage } from '../../../pages/home/home';
import { CustomerAccountPage } from '../../../pages/account/customer-account/customer-account';
import { CartPage } from '../../../pages/shopping-cart/cart/cart';
import { CustomerWishlistPage } from '../../../pages/account/customer-wishlist/customer-wishlist';
import { SearchProductsPage } from '../../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../../providers/follow-us/follow-us';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {  
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  public category_id;
  public child_id;
  public categories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private loadingProvider: LoadingProvider,
    public viewCtrl: ViewController,
    private followUsProvider: FollowUsProvider,
  ) {
    this.getServerData();
  }

  ionViewDidLoad() {
  }

  public getServerData() {
    this.loadingProvider.present();
    this.productProvider.categories().subscribe(
      response => {        
        this.categories = response.category;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  getDetail(data: any) {
    this.navCtrl.push(CategoryProductsPage, { category_id: data.category_id });
  }


  public shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
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
