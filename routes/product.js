const express = require('express');
const path = require('path');
const router = express.Router();
const products = require('../model/products');
const structure = require('../controller/structureEJS');
const controllers = require('../controller/productsControllers');

router.get('/',controllers.getController);

router.get('/findid/:id',controllers.getFindIdController);

router.get('/findname/:name',controllers.getFindNameController);

module.exports = router;