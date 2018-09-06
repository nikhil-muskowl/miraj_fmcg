import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product';
import { ProductPage } from '../product/product';
import { ActionSheetController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';
import { HomePage } from '../../../pages/home/home';
import { CustomerAccountPage } from '../../../pages/account/customer-account/customer-account';
import { CartPage } from '../../../pages/shopping-cart/cart/cart';
import { CustomerWishlistPage } from '../../../pages/account/customer-wishlist/customer-wishlist';
import { SearchProductsPage } from '../../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../../providers/follow-us/follow-us';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
@IonicPage()
@Component({
  selector: 'page-special-products',
  templateUrl: 'special-products.html',
})
export class SpecialProductsPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  public category_id;
  public rateValue;
  public filterData;

  public heading_title;
  public description;
  public categories;
  public products;
  public sorts;
  public limits;
  public pagination;
  public results;
  public search;
  public sort;
  public order;
  public limit;
  public page = 1;
  public productModel: any[] = [];
  public isInfinite = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productsProvider: ProductProvider,
    public actionSheetCtrl: ActionSheetController,
    private loadingProvider: LoadingProvider,
    private followUsProvider: FollowUsProvider,
  ) {
    this.getServerData();    
  }

  ionViewDidLoad() {

  }


  presentSortActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort Products',
    });

    for (let index = 0; index < this.sorts.length; index++) {

      var sortsButtons = {
        text: this.productsProvider.decodeEntities(this.sorts[index].text),
        handler: () => {
          this.sort = this.sorts[index].value;
          let sortArray = this.sort.split("-");
          this.sort = sortArray[0];
          this.order = sortArray[1];
          this.productModel = [];
          this.getServerData();
        }
      };
      actionSheet.addButton(sortsButtons);
    }
    actionSheet.present();
  }

  presentLimitActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Limit of Products',
    });

    for (let index = 0; index < this.limits.length; index++) {
      var limitButtons = {
        text: this.limits[index].text,
        handler: () => {
          this.limit = this.limits[index].value;
          this.page = 1;
          this.productModel = [];
          this.getServerData();
        }
      };
      actionSheet.addButton(limitButtons);
    }
    actionSheet.present();
  }

  public getServerData() {
    this.filterData = {
      'limit': this.limit,
      'sort': this.sort,
      'order': this.order
    };
    this.loadingProvider.present();
    this.productsProvider.specialProducts(this.filterData).subscribe(
      response => {
        this.heading_title = response.heading_title;
        this.description = response.description;
        this.categories = response.categories;
        this.products = response.products;
        this.sorts = response.sorts;
        this.limits = response.limits;

        this.binddata();
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  binddata() {
    for (let index = 0; index < this.products.length; index++) {
      this.productModel.push({
        product_id: this.products[index].product_id,
        thumb: this.products[index].thumb,
        name: this.products[index].name,
        description: this.productsProvider.decodeEntities(this.products[index].description),
        price: this.products[index].price,
        special: this.products[index].special,
        tax: this.products[index].tax,
        discountrate: this.products[index].discountrate,
        offerimage: this.products[index].offerimage,
        vegsignimage: this.products[index].vegsignimage,
        minimum: this.products[index].minimum,
        rating: this.products[index].rating
      });
    }
  }

  getProductDetail(data: any) {
    this.navCtrl.push(ProductPage, { product_id: data.product_id });
  }

  onRateChange(rate) {
    this.rateValue = 0;
    this.rateValue = parseFloat(rate);
  }

  doInfinite(infiniteScroll) {
    // if (this.products.length > 0 && this.pagination.length != this.page) {
    //   this.page++;
    //   this.getServerData();
    //   this.isInfinite = true;
    // } else {
    //   this.isInfinite = false;
    // }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
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
