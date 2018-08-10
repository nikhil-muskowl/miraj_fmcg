import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerRequestPage } from './customer-request';

@NgModule({
  declarations: [
    CustomerRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerRequestPage),
  ],
})
export class CustomerRequestPageModule {}
