const express = require('express');
const router = express.Router();
const path = require('path');
const structure = require('../controller/structureEJS');
const products = require('../model/products');


getController = (req,res)=>{

    structure(['header','footer']).then((tags)=>{
        res.render(path.join('..','views','deleteProduct'),{
            header: tags['header'],
            footer: tags['footer']
        });
        }
    );
}

postController = async (req,res) =>{

    const {productname,productid} = req.body;
    var deleteCondition = false;

    if (!productid && !productname){
        res.status(400).json({'message':'Product name or id are required'});
    } 
    try{
        
        if (productname){
            const product = await products.findOne({"productname":productname}).exec();
            if(!product) return res.status(404).json({'message':'Product not Found'});
            const result =  await products.deleteOne({"productname":productname}).exec();
            deleteCondition = true;
        }
        
        structure(['crudHeader','footer']).then((tags) =>{
            res.render(path.join('..','views','crudResult'),{
                crudResult:`Product ${productname} has sucessfully been deleted`,
                header: tags['crudHeader'],
                footer: tags['footer']
            });
            }
        )
        
    }catch (error){
        console.log(error);
        res.status(500).json({'message':error.message});
    }
    
}

module.exports = {getController,postController};