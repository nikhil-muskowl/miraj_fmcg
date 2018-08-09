import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from "ionic-angular";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Platform } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { Storage } from '@ionic/storage';
import { CustomerModel } from '../../models/customer-model';
import { CustomerLoginPage } from '../../pages/account/customer-login/customer-login';

@Injectable()
export class CustomerProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;
  private agree = 1;

  public customer_id = 0;
  public fullname = '';
  public username = '';
  public email = '';
  public telephone = '';
  public address = '';
  public postcode = '0';
  public city = '';
  public country_id = 0;
  public zone_id = 0;
  public district_id = 0;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public platform: Platform,
    public app: App
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');

    this.fillData();

    this.getCustomerData(this.customer_id).subscribe(
      response => {
        if (response) {
          this.responseData = response;
          this.fullname = this.responseData.fullname;
          this.email = this.responseData.email;
          this.telephone = this.responseData.telephone;
          this.zone_id = this.responseData.zone_id;
          this.district_id = this.responseData.district_id;
          this.postcode = this.responseData.postcode;
          this.city = this.responseData.city;
          this.address = this.responseData.address;
        }
      },
      err => console.error(err),
      () => {
      }
    );
  }

  clear() {
    this.customer_id = 0;
    this.fullname = '';
    this.username = '';
    this.email = '';
    this.telephone = '';
    this.country_id = 0;
    this.zone_id = 0;
    this.district_id = 0;
    this.city = '';
    this.postcode = '0';
    this.address = '';
  }

  fillData() {
    this.getData()
      .then((data) => {
        if (data) {
          ConfigProvider.CUSTOMER_ID = data.customer_id;
          this.customer_id = data.customer_id;
          this.fullname = data.fullname;
          this.email = data.email;
          this.telephone = data.telephone;
          this.country_id = data.country_id;
          this.zone_id = data.zone_id;
          this.district_id = data.district_id;
          this.city = data.city;
          this.postcode = data.postcode;
          this.address = data.address;
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  apiRegister(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'customerregistration';

    this.formData.append('fullname', data.fullname);
    this.formData.append('username', data.username);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('password', data.password);
    this.formData.append('confirm', data.confirm);
    this.formData.append('agree', this.agree.toString());

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  apiLogin(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'customerlogin';

    this.formData.append('email', data.email);
    this.formData.append('password', data.password);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getCustomerData(customer_id) {
    this.URL = ConfigProvider.BASE_URL_ + 'accountdetail?customer_id=' + customer_id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  setData(data) {
    return this.getCustomerData(data.customer_id).subscribe(
      response => {
        // console.log(response);
        return this.storage.set('myData', response).then(
          () => {
            console.log('Stored item!');
            this.fillData();
            return true;
          },
          error => {
            console.error('Error storing item', error);
            return false;
          }
        );
      },
      err => {
        console.error(err);
        return false;
      }
    );
  }

  unSetData() {
    return this.storage.remove('myData').then(
      () => {
        console.log('Stored item remove!');
        this.clear();
        return true;
      },
      error => {
        console.error('Error storing item remove', error);
        return false;
      }
    );
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('myData')
        .then((data) => {
          resolve(data);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

  changeAccountData(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'updateaccountdetail?customer_id=' + ConfigProvider.CUSTOMER_ID;

    this.formData.append('fullname', data.fullname);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('country_id', data.country_id);
    this.formData.append('zone_id', data.zone_id);
    this.formData.append('district_id', data.district_id);
    this.formData.append('postcode', data.postcode);
    this.formData.append('city', data.city);
    this.formData.append('address', data.address);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  changePassword(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'changepassword?customer_id=' + ConfigProvider.CUSTOMER_ID;
    this.formData.append('currentpassword', data.currentpassword);
    this.formData.append('password', data.password);
    this.formData.append('confirm', data.confirm);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  login(){
    
  }

  logout() {
    this.unSetData()
      .then((data) => {
        if (data) {          
          window.location.reload();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

}
