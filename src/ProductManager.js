import fs from 'fs/promises'; // Using promises version of fs

export default class ProductManager{
    constructor(filePath){
        this.products = [{
            "title": "Producto prueba 1",
            "description": "Este es un producto prueba 1",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc1",
            "stock": 25,
            "id": 1
        },
        {
            "title": "Producto prueba 2",
            "description": "Este es un producto prueba 2",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc2",
            "stock": 25,
            "id": 2
        },
        {
            "title": "Producto prueba 3",
            "description": "Este es un producto prueba 3",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc3",
            "stock": 25,
            "id": 3
        },
        {
            "title": "Producto prueba 4",
            "description": "Este es un producto prueba 4",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc4",
            "stock": 25,
            "id": 4
        },
        {
            "title": "Producto prueba 5",
            "description": "Este es un producto prueba 5",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc5",
            "stock": 25,
            "id": 5
        },
        {
            "title": "Producto prueba 6",
            "description": "Este es un producto prueba 6",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc6",
            "stock": 25,
            "id": 6
        },
        {
            "title": "Producto prueba 7",
            "description": "Este es un producto prueba 7",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc7",
            "stock": 25,
            "id": 7
        },
        {
            "title": "Producto prueba 8",
            "description": "Este es un producto prueba 8",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc8",
            "stock": 25,
            "id": 8
        },
        {
            "title": "Producto prueba 9",
            "description": "Este es un producto prueba 9",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc9",
            "stock": 25,
            "id": 9
        },
        {
            "title": "Producto prueba 10",
            "description": "Este es un producto prueba 10",
            "price": 200,
            "thumbnail": "Sin imagen",
            "code": "abc10",
            "stock": 25,
            "id": 10
        }];  
        this.path = filePath;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(!this.products.find((product)=> product.code === code)){
            let newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            };
            if(!Object.values(newProduct).some((valor)=> valor === "" || null || undefined)){
                let product = [...this.products];
        
                let ProductId
                product.length <= 0 ?
                ProductId = 1
                :
                ProductId = this.products[this.products.length - 1].id + 1;
        
                product.push({...newProduct, id:ProductId});
                this.products = product;
            }else{
                return console.log("Error: Error adding product, Some field is empty, null or undefined");
            }
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
