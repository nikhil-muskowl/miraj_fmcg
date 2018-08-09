import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerOrderViewPage } from './customer-order-view';

@NgModule({
  declarations: [
    CustomerOrderViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerOrderViewPage),
  ],
})
export class CustomerOrderViewPageModule {}
