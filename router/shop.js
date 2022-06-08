const express = require('express')


const router = express.Router()
const getProduct = require('../controller/product')


router.get('/',getProduct.getProductPage)

router.get('/product/:productId',getProduct.getProductDetailPage)

router.get('/product',getProduct.getShopPage)



router.post('/product',getProduct.postProduct )


module.exports = router