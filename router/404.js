const express = require('express')

const router = express.Router()

const getError = require('../controller/error')

router.use('/', getError.getErrorPage)

module.exports = router