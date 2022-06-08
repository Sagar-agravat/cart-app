const express = require('express');

const router = express.Router();

const getProduct = require('../controller/product');
const { route } = require('./order');
const isAuth = require('../middleware/isAuth')


router.get('/add-product', isAuth, getProduct.getAddproductPage)

router.get('/admin-product', isAuth, getProduct.getAdminproductPage)

router.post('/delete/:productId', isAuth, getProduct.deletePage)

router.get('/edit/:productId', isAuth, getProduct.editProductPage)

router.post('/editedProduct/:productId', isAuth, getProduct.posteditedProduct)

module.exports = router