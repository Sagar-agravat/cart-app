const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const { validationResult } = require('express-validator/check')



const { cookie } = require('express/lib/response')
const path = require('path')
const User = require('../module/user')
const { getMaxListeners } = require('process')

const transporter = nodemailer.createTransport(sendgridTransport({

auth: {
    api_key: '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'
}


}))



exports.getLoginPage = (req,res,next) => {
   let message = req.flash('error')

   if(message.length == 0){
       message = null
   }
    
    res.render(path.join(__dirname, '../', 'views', 'login'), { cls: '/login', isAuthenticated: req.session.isloggedin, message: message, iserror: false, invalid: ''})
}
    


exports.postLoginPage = (req,res,next) => {
    const email = req.body.email
    const password =  req.password
    const error = validationResult(req)
    if(!error.isEmpty()){
       return res.status(422).render(path.join(__dirname, '../', 'views', 'login'), { cls: '/login', isAuthenticated: req.session.isloggedin, invalid:error.array()[0].param,message: error.array()[0].msg, iserror:true, email: req.body.email,password: req.body.password})
    }

    User.findOne({emailId: email}).then(user => {
        // console.log(user)
        if(!user){
            req.flash('error', 'Entre valid email or password')
            return res.redirect('/login')
        }
        req.session.user = user
       req.session.isloggedin = true;
       return res.redirect('/')
    })
}
  




exports.getLogoutPage = (req,res,next) => {
    req.session.destroy(() => {
        // console.log(req.session.isloggedin)
        res.redirect('/')
    })
}


exports.getSingupPage = (req,res,next) => {
    let message = req.flash('error')
    if(message.length == 0)
    {
        message = null;
    }
    res.render(path.join(__dirname, '../', 'views', 'singup'), {cls: '/singup', isAuthenticated: req.session.isloggedin, message: message, invalid: false,iserror:false})
}


    



exports.postSingupPage = (req,res,next) => {
    
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array())
        let invalid = error.array()[0].param
        return res.status(422).render(path.join(__dirname, '../', 'views', 'singup'), {cls: '/singup', isAuthenticated: req.session.isloggedin, message: error.array()[0].msg, 
        invalid: error.array()[0].param,email: req.body.email,password: req.body.password,confirm_password: req.body.confirm_password, iserror: true})
    }
    User.findOne({emailId: email}).then(user => {
        if(!user){
            if(confirm_password === password){
                // console.log('user in !user loop', user)
                const user = new User({
                    emailId: email,
                    password: password,
                    cart: {items: [] }
                })
                user.save();
                transporter.sendMail({
                    to: email,
                    from: 'agravatsagar45@gmail.com',
                    subject: 'sign in succeded',
                    html: '<p>you have just signed in </p>'
                    
                })
               return res.redirect('/login')
                
            }
            req.flash('error', 'Password you entered are ont same.')
            return res.redirect('/singup')
        }
        req.flash('error', 'alrady exist.')
        return res.redirect('/singup')
    })
    }


    exports.getNewPasswordPage = (req,res,next) => {
      
        let message = req.flash('error')
        if(message.length == 0){
            message = null;
        }
        res.render(path.join(__dirname, '../', 'views', 'resetpassword'), {cls:'', isAuthenticated: req.session.isloggedin , message: message, iserror: false, invalid: ''})
    }
    

    exports.postNewPasswordPage = (req,res,next) => {
       let error = validationResult(req)
       if(!error.isEmpty()){
           res.status(422).render(path.join(__dirname, '../', 'views', 'resetpassword'), {cls:'', isAuthenticated: req.session.isloggedin , message: error.array()[0].msg, invalid: error.array()[0].param, email: req.body.email, iserror: true})
       } 
       
       
       
        let token;
        crypto.randomBytes(32, (error,buffer) => {
            if(error){
             console.log(error)
             return res.redirect('/reset-password')
         }
          token = buffer.toString('hex')
         
          
        })
        
        const email = req.body.email
        User.findOne({emailId: email}).then(user => {
            if(!user){
                req.flash('error', 'you have entered wrong ID')
                return res.redirect('back')
            }
            user.resetToken = token
            user.resetExpairy = Date.now() + 3600000;
            user.save()
            console.log('this is geanrated token',token)
            res.redirect('/')
            transporter.sendMail({
                
                to: email,
                from: 'agravatsagar45@gmail.com',
                subject: 'password reset request',
                html: `
                <p>to reset your password pleas click the link below</p>
              <p> <a href="http://localhost:3000/reset_password/${token}">http://localhost:3000/reset-password</a> </p>
                `
            })
        }).catch(err => console.log(err))
    }
            
                
    exports.getSetPasswordPage = (req, res, next) => {
        let message = req.flash('error')
        let token = req.params.token
        if(message.length == 0){
            message = null;
        }
        User.findOne({resetToken: token}).then(user => {
            if(!user){
                res.redirect('/')
            }

            res.render(path.join(__dirname,'../', 'views', 'setpassword'), {cls:'', isAuthenticated: req.session.isloggedin,message:message,token: token})
        })
    }
            
            
       
exports.postSetPasswordPage = (req, res, next) => {
    let token = req.body.token
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    console.log( token)

    if(password !== confirmPassword){

        console.log('in if ', token)
        req.flash('error', 'Both password should match. Pleas try agin.')
        return res.redirect(`/reset_password/${token}`)
    }
    User.findOne({resetToken: token, resetExpairy: {$gt: Date.now()}}).then(user => {
        user.password = password,
        user.resetToken= undefined,
        user.resetExpairy = undefined
        user.save()
        res.redirect('/login')
    })

}

