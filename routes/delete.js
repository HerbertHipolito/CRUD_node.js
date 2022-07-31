const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');

router.get('/', (req,res)=>{

    res.sendFile(path.join(__dirname,'..','views','deleteProduct.html'));

}).post('/new_product', async (req,res) =>{

    const {productid,productname} = req.body;

    if (!productid && !productname) return res.status(400).json({'message':'Product name or id are required'});

    try{
        if (productid){
            const productname = await products.findById(productid).exec().productname;
            const result =  await products.deleteOne({"__id":productid}).exec();
        }else{
            const result =  await products.deleteOne({"productname":productname}).exec();
        }
        res.render(path.join('..','views','crudResult'),{
            crudResult:`Product ${productname} has sucessfully been deleted`
        });
    }catch (error){
        console.log(error);
        res.status(500).json({'message':error.message});
    }
    
})

module.exports = router;