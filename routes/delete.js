const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('../model/products');
const structure = require('../controller/structureEJS');
const controllersDelete = require('../controller/deleteControllers');

router.get('/', controllersDelete.getController).post('/deleteResult', controllersDelete.postController);

module.exports = router;