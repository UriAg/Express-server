import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    product_title: String,
    product_description: String,
    product_price: Number,
    product_code:{
        type: String,
        unique:true
    },
    product_stock: Number,
    product_category: String,
    product_productStatus: Boolean,
    product_thumbnails: Array
})

export const productsModel = mongoose.model(productsCollection, productsSchema);