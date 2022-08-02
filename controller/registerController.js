const express = require('express');
const router = express.Router();
const path = require('path');
const structure = require('../controller/structureEJS');
const products = require('../model/products');

const getController = async (req,res)=>{

    structure(['header','footer']).then(
        (tags)=>{
            res.render(path.join('..','views','addProduct'),{
                header: tags['header'],
                footer: tags['footer']
            });
        }
    )

}

const postController =  async (req,res) => {
    
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

        structure(['crudHeader','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','crudResult'),{
                    crudResult:`The product ${productname} has successfully been registered`,
                    header:tags['crudHeader'],
                    footer: tags['footer']
                });
            }
        )
        
        } catch (error) {
        res.status(500).json({'message':error.message});

    }

}

module.exports = {getController,postController};