import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerRequestsPage } from './customer-requests';

@NgModule({
  declarations: [
    CustomerRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerRequestsPage),
  ],
})
export class CustomerRequestsPageModule {}
