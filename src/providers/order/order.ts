import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';
import { CustomerProvider } from '../customer/customer';
import { Storage } from '@ionic/storage';
@Injectable()
export class OrderProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  public customer_id: any;
  public fullname: any;
  public email: any;
  public mobile: any;
  public ImmediateShipping: any;
  public baddress: any;
  public bdistrict_id: any;
  public bpostcode: any;
  public bcity: any;
  public bzone_id: any;
  public saddress: any;
  public sdistrict_id: any;
  public spostcode: any;
  public scity: any;
  public szone_id: any;

  constructor(public http: HttpClient, public customerProvider: CustomerProvider) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.customer_id = this.customerProvider.customer_id;
    this.ImmediateShipping = false;
  }

  clear() {
    this.fullname = '';
    this.email = '';
    this.mobile = '';
    this.ImmediateShipping = '';
    this.baddress = '';
    this.bdistrict_id = 0;
    this.bpostcode = '';
    this.bcity = '';
    this.bzone_id = 0;
    this.saddress = '';
    this.sdistrict_id = 0;
    this.spostcode = '';
    this.scity = '';
    this.szone_id = 0;
  }

  setCustomerData(data: any) {
    this.fullname = data.fullname;
    this.email = data.email;
    this.mobile = data.mobile;
  }

  setPaymentData(data: any) {
    this.bzone_id = data.zone_id;
    this.bdistrict_id = data.district_id;
    this.bcity = data.city;
    this.bpostcode = data.postcode;
    this.baddress = data.address;
  }

  setShippingData(data: any) {
    this.szone_id = data.zone_id;
    this.sdistrict_id = data.district_id;
    this.scity = data.city;
    this.spostcode = data.postcode;
    this.saddress = data.address;
  }

  addOrder(): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'checkoutcart';

    this.formData.append('customer_id', this.customer_id);
    this.formData.append('fullname', this.fullname);
    this.formData.append('email', this.email);
    this.formData.append('mobile', this.mobile);
    this.formData.append('ImmediateShipping', this.ImmediateShipping);
    
    this.formData.append('bdistrict_id', this.bdistrict_id);
    this.formData.append('bzone_id', this.bzone_id);
    this.formData.append('bpostcode', this.bpostcode);
    this.formData.append('bcity', this.bcity);    
    this.formData.append('baddress', this.baddress);

    this.formData.append('sdistrict_id', this.sdistrict_id);
    this.formData.append('szone_id', this.szone_id);
    this.formData.append('spostcode', this.spostcode);
    this.formData.append('scity', this.scity);
    this.formData.append('saddress', this.saddress);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getOrders() {
    this.URL = ConfigProvider.BASE_URL_ + 'orders?customer_id=' + ConfigProvider.CUSTOMER_ID;    
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getOrderDetail(order_id: any) {
    this.URL = ConfigProvider.BASE_URL_ + 'orderinfo?order_id=' + order_id + '&customer_id=' + ConfigProvider.CUSTOMER_ID;  
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }


  setRequest(data:any){
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'submitrequest';
    this.formData.append('CustomerID', this.customer_id);
    this.formData.append('OrderRefNo', data.OrderRefNo);
    this.formData.append('Reason', data.Reason);
    this.formData.append('RequestType', data.RequestType);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getRequests() {
    this.URL = ConfigProvider.BASE_URL_ + 'myrequest?customer_id=' + ConfigProvider.CUSTOMER_ID;    
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }


}
