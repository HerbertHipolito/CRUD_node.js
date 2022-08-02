const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');
const structure = require('../controller/structureEJS');
const  ControllersUpdate =  require('../controller/updateController');

router.get('/',ControllersUpdate.getController).post('/update_product', ControllersUpdate.postController);

module.exports = router;