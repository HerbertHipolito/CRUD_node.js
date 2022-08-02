
const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');
const structure = require('../controller/structureEJS');
const controllersUpdate =  require('../controller/registerController');

router.get('/',controllersUpdate.getController).post('/new_product',controllersUpdate.postController);

module.exports = router;