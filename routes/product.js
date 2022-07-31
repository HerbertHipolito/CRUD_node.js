const express = require('express');
const path = require('path');
const router = express.Router();
const products = require('../model/products');

router.get('/',async (req,res) =>{
    const myProducts = await products.find();
    if (!myProducts) return res.status(204).json({'message':'products did not find'});

    res.render(path.join('..','views','allproducts'),{
        productList:myProducts
    });
})

router.get('/:id',async (req,res)=>{
    
    const product = await products.findById(req.params.id).exec();
    
    if (!product) return res.status(404).json({'message':'Product not found'});
    
    res.render(path.join('..','views','product'),{
        product: product  
    });
})

///https://www.youtube.com/watch?v=yH593K9fYvE
module.exports = router;