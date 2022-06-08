const express = require('express')

const router = express.Router();

const getProduct = require('../controller/product')
const isAuth = require('../middleware/isAuth')

router.get('/order', isAuth, getProduct.getOrderPage)

router.get('/cart', isAuth, getProduct.getCartPage)

router.get('/cart/:productId', isAuth, getProduct.getAddToCart)

router.post('/cart/:productId', isAuth, getProduct.postDeletCart)

router.get('/order', isAuth, getProduct.getOrderPage)

router.post('/order1', isAuth, getProduct.getOrder1Page)

module.exports = router