import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  public title;
  public subTitle;
  public message;

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.title,
      subTitle: this.subTitle,
      message: this.message,
      buttons: ['OK']
    });
    alert.present();
  }

  

}
