
const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');


router.get('/',async (req,res)=>{

    res.sendFile(path.join(__dirname,'..','views','addProduct.html'));

}).post('/new_product', async (req,res) => {
    
    const {productname,descriptionproduct,productvalue,productinventory} = req.body;

    if (!productname  || !productvalue || !productinventory)  {
        console.log('error');
        return res.status(400).json({'message':'Product name, value and inventory are required'});
    };

    const duplicate = await products.findOne({productname:productname}).exec();

    if (duplicate) {
        console.log('This product is already registered');
        return res.sendStatus(409);
    }

    try {
        const result = await products.create({"productname":productname, "price":productvalue,"description":descriptionproduct,"inventory":productinventory });
        
        console.log(result);
        res.render(path.join('..','views','crudResult'),{
            crudResult:'Product has successfully been registered'
        });
        
        } catch (error) {
        res.status(500).json({'message':error.message});

    }

});

module.exports = router;