const express = require('express');
const router = express.Router();
const path = require('path');
const structure = require('../controller/structureEJS');
const products = require('../model/products');

const getController = (req,res) =>{

    structure(['header','footer']).then((tags)=>{
        res.render(path.join('..','views','updateProduct'),{
            header: tags['header'],
            footer: tags['footer']
        });
    });
}

const postController = async (req,res)=>{
    
    const {productName,description,inventory} = req.body;
    productName;
    
    if (!productName) return res.status(401).json({'message':'Name is missing'});
    if (!inventory && !description) return res.status(401).json({'message':'Inform the inventory or description'});
    if (inventory < 0) return res.status(401).json({'message':'inventory input is invalid'});

    try {
        
        const product = await products.findOne({"productname":productName});

        if (!product) return res.status(404).json({'message':'Product not found'});

        if (inventory){
            product.inventory = inventory;
        }else{
            product.description = description;
        };

        const result = await product.save();
        structure(['crudHeader','footer']).then((tags)=>{
            res.render(path.join('..','views','crudResult'),{
                crudResult:`The product ${productName} has sucessfully updated`,
                header:tags['crudHeader'],
                footer:tags['footer'] 
            });
            }
        );

    }catch(error){
        console.log(error);
        res.status(401).json({'message':'error during the update'});
    }
}

module.exports = {getController,postController};