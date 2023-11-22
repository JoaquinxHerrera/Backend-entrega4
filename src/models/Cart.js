export class Cart{
    constructor ({cid, products = []}){
        this.cid = cid;
        this.products = products;
    }
}