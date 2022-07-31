const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');


router.get('/', (req,res) =>{

    res.sendFile(path.join(__dirname,'..','views','updateProduct.html'));

}).post('/new_product', async (req,res)=>{
    
    const {productid,productinventory,descriptionproduct} = req.body;
    description=descriptionproduct;
    id=productid;


    if (!productinventory && !description) return res.status(401).json({'message':'Inform the inventory or description'});
    if (productinventory < 0) return res.status(401).json({'message':'input inventory is invalid'});

    try {
        
        const product = await products.findOne({_id: id}).exec();

        if (productinventory){
            product.inventory = productinventory;
        }else{
            product.description = description;
        };

        res.render(path.join('..','views','crudResult'),{
            crudResult:`The product ${id} has sucessfully updated`
        });

        const result = await product.save();


    }catch(error){
        console.log(error);
        res.status(401).json({'message':'error during the update'});
    }
});

module.exports = router;