import fs from 'fs';

export default class CartManager{
    constructor(filePath){
        this.carts = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : []; 
        this.path = filePath;
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    }

    addCart(){
        let newCart = {
            products: []
        }

        let cartsOnList = [...this.carts];
    
        let cartId
        cartsOnList.length <= 0 ?
        cartId = 1
        :
        cartId = this.carts[this.carts.length - 1].id + 1;

        cartsOnList.push({...newCart, id:cartId});
        this.carts = cartsOnList;
        this.saveCarts();
    }

    getCarts(){
        return this.carts;
    }

    getProductsByCartId(id){
        let ProductOnCartIdSearch = this.carts.find(cart => cart.id === id);
        if(ProductOnCartIdSearch){
            return ProductOnCartIdSearch.products;
        }else{
            return {error:`Search error, cart not founded`}
        }
    }

    addProductToCart(cartId, productId, productQuantity){
        let cartSelected = this.carts.find((cart) => cart.id === cartId);
        if(cartSelected){
            let productExist = cartSelected.products.find(product => product.id === productId)
            productExist ? 
            productExist.quantity += 1 : 
            cartSelected.products.push({"id":productId, "quantity":productQuantity})
            this.saveCarts();
        }else{
            return {error:`Search error, cart not founded`}
        }
    }

}