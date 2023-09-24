import { Router } from "express";
// import ProductManager from "../ProductManager.js";
import {productsModel} from "../dao/models/products.model.js"

// const productManager = new ProductManager('./productsList.json');
export const router = Router();

// Endpoint para obtener todos los productos
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let limit = parseInt(req.query.limit)
        const products = limit ? await productsModel.find().limit(limit) : await productsModel.find();
        
        res.status(200).json({status:"success",products:products});
    } catch(error) {
        res.status(500).json({status:"error", error:error.message});
    }
});

// Endpoint para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const productId = req.params.pid;
        const product = await productsModel.findById(productId);
        if(!product) return res.status(404).json({status:"error", error:`Product with id "${productId}" not found`});
        res.status(200).json({product});
    }catch(error) {
        res.status(500).json({status:"error", error:error.message });
    }
});

router.post('/', async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    try{
        let {
            product_title,
            product_description,
            product_price,
            product_code,
            product_stock,
            product_category,
            product_productStatus,
            product_thumbnails
        } = req.body;

        let productQuery = [product_title, product_description, product_price, product_code, product_stock, product_category, product_productStatus, product_thumbnails];
        let productQueryValues = Object.values(productQuery);
        if(!productQueryValues.slice(0, productQueryValues.length - 2).some(value => value === "" || null || undefined)){

            product_productStatus = product_productStatus ?? true;
            product_thumbnails = product_thumbnails ?? [];

            if([product_title, product_description, product_code, product_category].some(value => typeof value !== "string")
            ||
            [product_price, product_stock].some(value => typeof value !== "number")
            ||
            typeof product_productStatus !== "boolean"
            ||
            product_thumbnails.some(value => typeof value !== "string")){
                return res.status(400).json({status:"error",error:'Some incorrect value type'})
            }

            let existsProduct = await productsModel.find({product_code: product_code});
            if(existsProduct) return res.send({status:"error", error:`Product code already exists`})


            const response = await productsModel.create({
                product_title,
                product_description,
                product_price,
                product_code,
                product_stock,
                product_category,
                product_productStatus,
                product_thumbnails
            })
            res.status(200).json({response, message:"Product added succesfully"})
            
        }else{
            res.status(400).json({status:"error", error:'Some value is undefined'})
        }
    }catch(error){
        res.status(500).json({status:"error", error:error.message})
    }
});

router.put('/:pid', async (req, res)=>{
    try {
        let productId = req.params.pid;
    
        let existsProduct = await productsModel.findById(productId);
        if(!existsProduct) return res.send({status:"error", error:`User with id ${productId} does not exist`})

        const productModify = req.body;
        if(!productModify.field || !productModify.newFieldValue){
            return res.status(400).json({status:"error",error:'Some value is empty'})
        }

        let response = await productsModel.updateOne({_id:productId}, productModify);
        res.status(200).json({response, message: "Product modified succesfully"})
        
    }catch(error){
        res.status(500).json({status:"error", error:error.message})
    }
})

router.delete('/:pid', async (req, res)=>{
    try {
        let productId = req.params.pid;

        let existsProduct = await productsModel.findById(productId);
        if(!existsProduct) return res.send({status:"error", error:`User with id ${productId} does not exist`})

        let response = await productsModel.deleteOne({_id:productId})
        res.status(200).json({response, message: "Product deleted succesfully"})
    }catch(error){
        res.status(500).json({status:"error", error:error.message})
    }
})