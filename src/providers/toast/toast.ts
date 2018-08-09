import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {
  private toast;

  public message;
  public duration = 3000;
  public position = 'bottom';
  public showCloseButton: true;
  public closeButtonText: "Close";

  constructor(private toastCtrl: ToastController, public http: HttpClient) {
  }


  presentToast() {
    this.toast = this.toastCtrl.create({
      message: this.message,
      duration: this.duration,
      position: this.position,
      showCloseButton: this.showCloseButton,
      closeButtonText: this.closeButtonText
    });

    this.toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    this.toast.present();
  }




}
