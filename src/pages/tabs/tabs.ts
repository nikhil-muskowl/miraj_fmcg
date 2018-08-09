import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CategoriesPage } from '../products/categories/categories';
import { SpecialProductsPage } from '../products/special-products/special-products';
import { HomePage } from '../home/home';
import { StoresPage } from '../stores/stores';
import { CustomerAccountPage } from '../account/customer-account/customer-account';
import { CustomerOrderPage } from '../account/customer-order/customer-order';
import { Tabs } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {  
  @ViewChild("tabs") tabs: Tabs;

  tab1Root = HomePage;
  tab2Root = CategoriesPage;
  tab3Root = SpecialProductsPage;
  tab4Root = CustomerAccountPage;
  tab5Root = StoresPage;


  myIndex: number;
  constructor(navParams: NavParams) {
    if (navParams.data) {
      this.myIndex = navParams.data.tabIndex || 0;
    } else {
      this.myIndex = 0;
    }
    console.log(this.myIndex);
  }
  
}
