import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product';
import { ModalProvider } from '../../../providers/modal/modal';
import { ProductPage } from '../product/product';
import { ActionSheetController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';

import { CartPage } from '../../shopping-cart/cart/cart';
import { SearchProductsPage } from '../../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../../providers/follow-us/follow-us';

@IonicPage()
@Component({
  selector: 'page-category-products',
  templateUrl: 'category-products.html',
})
export class CategoryProductsPage {

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
    this.category_id = this.navParams.data.category_id;
    this.getServerData();
  }

  ionViewDidLoad() {

  }

  goBack() {
    this.navCtrl.pop();
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
      'page': this.page,
      'category_id': this.category_id,
      'limit': this.limit,
      'sort': this.sort,
      'order': this.order
    };
    this.loadingProvider.present();
    this.productsProvider.products(this.filterData).subscribe(
      response => {
        this.heading_title = response.heading_title;
        this.description = response.description;
        this.categories = response.categories;
        this.products = response.products;
        this.pagination = response.pagination;
        this.sorts = response.sorts;
        this.limits = response.limits;
        this.results = response.results;

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

  getDetail(data: any) {
    this.navCtrl.push(CategoryProductsPage, { category_id: data.category_id });
  }

  getProductDetail(data: any) {
    this.navCtrl.push(ProductPage, { product_id: data.product_id });
  }

  onRateChange(rate) {
    this.rateValue = 0;
    this.rateValue = parseFloat(rate);
  }

  doInfinite(infiniteScroll) {
    if (this.products.length > 0 && this.pagination.length != this.page) {
      this.page++;
      this.getServerData();
      this.isInfinite = true;
    } else {
      this.isInfinite = false;
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
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
