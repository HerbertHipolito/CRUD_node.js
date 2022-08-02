const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');
const structure = require('../controller/structureEJS');

router.get('/', (req,res) =>{

    structure(['header','footer']).then((tags)=>{
        res.render(path.join('..','views','updateProduct'),{
            header: tags['header'],
            footer: tags['footer']
        });
    });

}).post('/new_product', async (req,res)=>{
    
    const {productid,description,inventory} = req.body;
    console.log(productid,description,inventory);
    id=productid;
    
    if (!id) return res.status(401).json({'message':'ID missing'});
    if (!inventory && !description) return res.status(401).json({'message':'Inform the inventory or description'});
    if (inventory < 0) return res.status(401).json({'message':'input inventory is invalid'});

    try {
        
        const product = await products.findOne({_id: id}).exec();

        if (!product) return res.status(404).json({'message':'Product not found'});

        if (inventory){
            product.inventory = inventory;
        }else{
            product.description = description;
        };

        const result = await product.save();
        structure(['crudHeader','footer']).then((tags)=>{
            res.render(path.join('..','views','crudResult'),{
                crudResult:`The product ${id} has sucessfully updated`,
                header:tags['crudHeader'],
                footer:tags['footer'] 
            });
            }
        );

    }catch(error){
        console.log(error);
        res.status(401).json({'message':'error during the update'});
    }
});

module.exports = router;