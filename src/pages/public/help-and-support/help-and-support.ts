import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-help-and-support',
  templateUrl: 'help-and-support.html',
})
export class HelpAndSupportPage {

  public heading_title;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.heading_title = 'Help & Support';
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpAndSupportPage');
  }

}
