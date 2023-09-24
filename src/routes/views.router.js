import { Router } from 'express';
import ProductManager from "../dao/ProductManager.js";

const productsArray = new ProductManager('./productsList.json').getProducts();

export const router = Router();

router.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home', {productsArray});
})
