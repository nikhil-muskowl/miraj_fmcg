import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ConfigProvider } from '../config/config';
import { CustomerProvider } from '../customer/customer';

@Injectable()
export class InformationProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(
    public http: HttpClient,
    public configProvider: ConfigProvider,
    public customerProvider: CustomerProvider,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  send(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'contactus';
    
    this.formData.append('customer_id', this.customerProvider.customer_id.toString());
    this.formData.append('fullname', data.name);
    this.formData.append('email', data.email);
    this.formData.append('mobile', data.mobile);
    this.formData.append('message', data.enquiry);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

}
