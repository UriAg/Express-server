import { Router } from "express";
import CartManager from "../CartManager.js";

export const router = Router();
const cartManager = new CartManager('./cartList.json');

// Endpoint para obtener todos los productos
router.get('/:cid', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        let cartId = parseInt(req.params.cid);
        if(!cartId){
            return res.status(404).json({ error: 'Cart id undefined' })
        }
        let response = cartManager.getProductsByCartId(cartId);
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', (req, res)=>{
    let response = cartManager.addCart();
    res.status(200).json({response, message:"Cart added succesfully"})
})

router.post('/:cid/product/:pid', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);

    if(!cartId || !productId){
        return res.status(404).json({ error: 'Cart id or product id undefinded' })
    }

    let response = cartManager.addProductToCart(cartId, productId, 1);
    res.status(200).json({response, message:`Product added succesfully to cart ${cartId}`})
})




