import { Router } from "express";
import { cartsModel } from "../dao/models/cart.model.js";
// import CartManager from "../CartManager.js";

export const router = Router();
// const cartManager = new CartManager('./cartList.json');

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try { 
        const response = await cartsModel.find()
        res.status(200).json({status:"sucess", payload:response});
    }catch(error) {
        res.status(500).json({status:"error", error:error.message})
    }
});

// Endpoint para obtener todos los productos
router.get('/:cid', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let cartId = req.params.cid;
    try {   
        const response = await cartsModel.findById(cartId)
        res.status(200).json({status:"sucess", payload:response});
    }catch(error) {
        res.status(500).json({status:"error", error:error.message})
    }
});

router.post('/product/:cid', async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    let cartId = req.params.cid;
    let { products } = req.body
    let product = products[0];
    if(!product.productOnCart_id || !product.productOnCart_quantity) return res.status(400).json({status:"error", error:"Cart id or product id undefinded"}) 
    try {
        
        const cartExists = await cartsModel.findById(cartId);
        if(cartExists){
            const productExists = await cartsModel.findOne({ _id: cartId, 'products':{$elemMatch:{'productOnCart_id':product.productOnCart_id}}});
            if(productExists){
                const response = await cartsModel.updateOne(
                    {_id:cartId, 'products.productOnCart_id':product.productOnCart_id},
                    {$inc:{'products.$.productOnCart_quantity': product.productOnCart_quantity}}
                );

                return res.status(200).json({payload:response, message:`Product quantity added succesfully`})
            }

            const response = await cartsModel.updateOne({_id:cartId}, {$push:{products:product}})
            return res.status(200).json({payload:response, message:`Product added succesfully to cart ${cartId}`})
        }

        const response = await cartsModel.create({products:product})
        res.status(200).json({payload:response, message:`Cart created and product added correctly`});
        
    }catch(error){
        res.status(500).json({status:"error", error:error.message})
    }
})




