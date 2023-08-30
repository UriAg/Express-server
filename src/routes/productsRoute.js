import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager('./productsList.json');
export const router = Router();

// Endpoint para obtener todos los productos
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = productManager.getProducts();
    
        if (limit) {
            let limitedProducts = products.slice(0, limit)
            res.status(200).json({limitedProducts});
        } else {
            res.status(200).json({products});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para obtener un producto por su ID
router.get('/:pid', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        
        if (product) {
            res.status(200).json({product});
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', (req, res)=>{
    try{
        let productQuery = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails,
            productStatus: productStatus
        } = req.body;

        if(!Object.values(productQuery.slice(0, productQuery.length - 1)).some(value => value === "" || null || undefined)){
            if(Object.values([
                productQuery.title,
                productQuery.description,
                productQuery.code,
                productQuery.category
            ]).some(value => typeof value !== "string")
            ||
            Object.values([
                productQuery.price,
                productQuery.stock,
            ]).some(value => typeof value !== "number")
            ||
            typeof productQuery.productStatus !== "boolean"){
                return res.status(400).json({error: 'Incorrect value type'})
            }

            productManager.addProduct(productQuery);
        }else{
            return res.status(400).json({error: 'Any value is undefined'})
        }
    }catch{
        return res.status(500).json({error: 'Internal server error'})
    }
});

router.put('/:pid', (req, res)=>{
    let productId = parseInt(req.params.pid);
    if(isNaN(productId)){
        return res.status(400).json({error: 'Product id is not a number type'})
    }

    let { productToUpdate, newFieldValue } = req.body

    if(!productToUpdate || !newFieldValue){
        return res.status(400).json({error: 'Some value is empty'})
    }
    productManager.updateProduct(productId, productToUpdate, newFieldValue);
})

router.delete('/:pid', (req, res)=>{
    let productId = parseInt(req.params.pid);
    if(isNaN(productId)){
        return res.status(400).json({error: 'Product id is not a number type'})
    }
    productManager.deleteProduct(productId);
})