import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigProvider {

  static BASE_URL_: string = 'http://app1.mirajgroup.in/os/mobileapi/';
  static CUSTOMER_ID = '0';  

  constructor(public http: HttpClient) {

  }

}
