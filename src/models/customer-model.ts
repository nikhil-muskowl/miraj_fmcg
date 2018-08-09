export class CustomerModel {

    customer_id: any;
    fullname: any;
    username: any;
    email: any;
    telephone: any;

    constructor() {

    }

    clear() {
        this.customer_id = 0;
        this.fullname = '';
        this.username = '';
        this.email = '';
        this.telephone = '';
    }

}