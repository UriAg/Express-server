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
        const productQuery = req.body;
        let productQueryArray = Object.values(productQuery);

        if(!productQueryArray.slice(0, productQueryArray.length - 2).some(value => value === "" || null || undefined)){

            if(!productQuery.productStatus){
                productQuery.productStatus = true;
            }

            if(!productQuery.thumbnails){
                productQuery.thumbnails = [];
            }

            if([productQuery.title, productQuery.description, productQuery.code, productQuery.category].some(value => typeof value !== "string")
            ||
            [productQuery.price, productQuery.stock].some(value => typeof value !== "number")
            ||
            typeof productQuery.productStatus !== "boolean"
            ||
            productQuery.thumbnails.some(value => typeof value !== "string")){
                return res.status(400).json({error: 'Incorrect value type'})
            }
            const response = productManager.addProduct(productQuery);
            return res.status(200).json({response,
                message: "Element added succesfully"
            })
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
    const productModify = req.body;
    if(!productModify.field || !productModify.newFieldValue){
        return res.status(400).json({error: 'Some value is empty'})
    }
    let response = productManager.updateProduct(productId, productModify.field, productModify.newFieldValue);
    res.status(200).json({response,
        message: "Element modified succesfully"
    })
})

router.delete('/:pid', (req, res)=>{
    let productId = parseInt(req.params.pid);
    if(isNaN(productId)){
        return res.status(400).json({error: 'Product id is not a number type'})
    }
    let response = productManager.deleteProduct(productId);
    res.status(200).json({response,
        message: "Element deleted succesfully"
    })
})