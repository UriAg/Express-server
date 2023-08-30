import fs from 'fs';

export default class ProductManager{
    constructor(filePath){
        this.products = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : []; 
        this.path = filePath;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    addProduct(productQuery){
        if(!this.products.find((product)=> product.code === productQuery.code)){
            let newProduct = {
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails,
                productStatus
            } = productQuery;

            let productsOnList = [...this.products];
    
            let ProductId
            productsOnList.length <= 0 ?
            ProductId = 1
            :
            ProductId = this.products[this.products.length - 1].id + 1;
    
            productsOnList.push({...newProduct, id:ProductId});
            this.products = productsOnList;
            this.saveProducts();
        }else{
            return console.log("Error: Error adding product, Product code already exists");
        }
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        let IdProductSearch = this.products.find((prod) => prod.id === id);
        if(IdProductSearch){
            return IdProductSearch;
        }else{
            return console.log("Error: Search error, ID removed or not founded");
        }
    }

    deleteProduct(id) {
        const indexToDelete = this.products.findIndex(product => product.id === id);
        if (indexToDelete != -1) {
            this.products.splice(indexToDelete, 1);
            this.saveProducts();
        }else{
            return console.log(`Error: Delete error, ID "${id}" Not Found.`);
        }

    }

    updateProduct(id, field, value) {
        const productToUpdate = this.products.find(product => product.id === id);
        if (productToUpdate) {
            productToUpdate[field] = value;
            this.saveProducts()
        }else{
            return console.log(`Error: Search error, ID "${id}" Not Found.`);
        }
    }
}
// let path = 'textoSincrono.json';
// console.log('\x1b[33m // SE CREA LA INSTANCIA Y SE MUESTRAN LOS PRODUCTOS (ARRAY VACÍO) \x1b[0m');
// const ProductManagerInstance = new ProductManager(path);
// ProductManagerInstance.getProducts();

// console.log('\x1b[33m // SE AÑADE UN PRODUCTO Y SE MUESTRA EL ARRAY CON ESE PRODUCTO \x1b[0m');
// ProductManagerInstance.addProduct(
//     "Producto prueba",
//     "Este es un producto prueba",
//     200,
//     "Sin imagen",
//     "abc123",
//     25
//     )
// ProductManagerInstance.getProducts();

// console.log('\x1b[33m // SE LLAMA A getProductById SATISFACTORIAMENTE \x1b[0m');
// ProductManagerInstance.getProductById(1);

// console.log('\x1b[33m // SE LLAMA A getProductById INSATISFACTORIAMENTE \x1b[0m');
// ProductManagerInstance.getProductById(2);

// console.log('\x1b[33m // SE LLAMA A updateProduct Y SE MUESTRAN LOS RESULTADOS \x1b[0m');
// ProductManagerInstance.updateProduct(1, "description", "Este es un producto prueba - ACTUALIZADO CON updateProduct");
// ProductManagerInstance.getProductById(1);

// console.log('\x1b[33m // SE LLAMA A deleteProduct SATISFACTORIAMENTE Y SE MUESTRAN LOS RESULTADOS \x1b[0m');
// ProductManagerInstance.deleteProduct(1); 
// ProductManagerInstance.getProductById(1);

// console.log('\x1b[33m // SE LLAMA A deleteProduct INSATISFACTORIAMENTE CON EL ID DEL PRODUCTO ELIMINADO \x1b[0m');
// ProductManagerInstance.deleteProduct(1)
