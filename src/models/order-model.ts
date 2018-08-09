export class OrderModel {

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

    constructor() {

    }

    clear() {
        this.customer_id = 0;
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

    clearCustomerData() {
        this.fullname = '';
        this.email = '';
        this.mobile = '';
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

}