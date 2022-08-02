const express = require('express');
const router = express.Router();
const path = require('path');
const structure = require('../controller/structureEJS');
const products = require('../model/products');

const getController = async (req,res) =>{
  
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
    
}

const getFindIdController = async (req,res)=>{
    
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
}

const getFindNameController = async (req,res)=>{
    
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
}

module.exports = {getController,getFindIdController,getFindNameController}