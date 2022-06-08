const express = require('express')

const router = express.Router()

const getauth = require('../controller/auth')

const { check,body } = require('express-validator/check')




router.get('/login',getauth.getLoginPage)



router.post('/login',
check('email')
.isEmail(),
body('password', 'password is invalid')
.isLength({min: 5}),
getauth.postLoginPage)



router.get('/logout', getauth.getLogoutPage)



router.get('/singup', getauth.getSingupPage)



router.post('/singup', [check('email')
.isEmail()
.withMessage('email is not valid'),
body('password', 'password is invalid')
.isLength({min: 5})
.isAlphanumeric(),
body('confirm_password')
.custom((value, { req }) => {
    if(value === req.body.confirm_password) {
        throw new Error('password did not match!');
    }
    return true;
})],getauth.postSingupPage)



router.get('/reset-password',  getauth.getNewPasswordPage)



router.post('/reset-password', check('email')
.isEmail()
.withMessage('pleas enter valide email'),getauth.postNewPasswordPage)



router.get('/reset_password/:token',getauth.getSetPasswordPage)



router.post('/reset_password', [body('password', 'password is invalid')
.isLength({min: 5})
.isAlphanumeric(),body('confirm_password')
.custom((value, { req }) => {
    if(value === req.body.confirm_password) {
        throw new Error('password did not match!');
    }
    return true;
})],getauth.postSetPasswordPage)


module.exports = router
