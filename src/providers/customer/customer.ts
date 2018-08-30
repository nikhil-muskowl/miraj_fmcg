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

  public res: any;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public platform: Platform,
    public app: App
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');

    this.fillData();


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
    ConfigProvider.CUSTOMER_ID = this.getData();
    this.customer_id = Number(this.getData());


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

  apiRegister(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'customerregistration';

    this.formData.append('fullname', data.fullname);
    this.formData.append('username', data.username);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('password', data.password);
    this.formData.append('confirm', data.confirm);
    this.formData.append('dob', data.dob);
    this.formData.append('gender', data.gender);
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
    window.localStorage.setItem('myData', data.customer_id);
    this.fillData();
  }

  unSetData() {
    this.clear();
    try {
      window.localStorage.removeItem('myData');
      return true;
    } catch (error) {
      return false;
    }
  }

  getData() {
    return window.localStorage.getItem('myData');
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

  login() {
    
  }

  logout() {
    this.unSetData();
    window.location.reload();
  }

}
