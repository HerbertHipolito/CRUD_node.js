const express = require('express');
const path = require('path');
const router = express.Router();
const products = require('../model/products');
const structure = require('../controller/structureEJS');

router.get('/',async (req,res) =>{
  
    const myProducts = await products.find();
    if (!myProducts) return res.status(404).json({'message':'products did not find'});

    structure(['header','footer']).then((tags)=>{
        res.render(path.join('..','views','allproducts'),{
            productList:myProducts,
            header:tags['header'],
            footer:tags['footer']
            });
        }
    );
    
})

router.get('/findid/:id',async (req,res)=>{
    
    const product = await products.findById(req.params.id).exec();
    
    if (!product) return res.status(404).json({'message':'Product not found'});
    
    structure(['crudHeader','footer']).then((tags)=>{
        res.render(path.join('..','views','product'),{
            product: product,
            header: tags['crudHeader'],
            footer:tags['footer']}
            );
        }
    );
})

router.get('/findname/:name',async (req,res)=>{
    
    const product = await products.findOne({productname:req.params.name}).exec();
    
    if (!product) return res.status(404).json({'message':'Product not found'});
    
    structure(['crudHeader','footer']).then((tags)=>{
        res.render(path.join('..','views','product'),{
            product: product,
            header: tags['crudHeader'],
            footer:tags['footer']
            });
        }

    );
});


///https://www.youtube.com/watch?v=yH593K9fYvE
module.exports = router;