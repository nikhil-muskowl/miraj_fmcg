import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html',
})
export class TermsAndConditionsPage {
  public heading_title;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.heading_title = 'Terms & Conditions';
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsPage');
  }

}
