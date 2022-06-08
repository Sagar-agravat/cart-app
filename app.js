const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDbSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const multer = require('multer')

const mongodb_uri = 'mongodb+srv://sagar:mmxB77FxdAV292hy@cluster0.tzvt8h6.mongodb.net/test'

const app = express()

const store = new mongoDbSession({
    uri: mongodb_uri,
    collection: 'session'
}) 




app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer().single('image'))
app.use(session({secret: 'my secret', resave: false, saveuninitialized: false, store: store}))
app.use(flash())




const getShop = require('./router/shop')
const getOrder = require('./router/order')
const getAdmin = require('./router/add-product')
const getError = require('./router/404')
const getAuth = require('./router/auth')
const User = require('./module/user')
const { getMaxListeners, emitWarning, nextTick } = require('process')
const req = require('express/lib/request')
const user = require('./module/user')


app.use((req, res, next) => {
    if(!req.session.user){
        return next()
    }
    // console.log(req.session.user)
    User.findOne({emailId: req.session.user.emailId}).then(user =>{
        // console.log(user)
        req.user = user;
        next();
    })
})
    



app.use(getShop)

app.use(getOrder)

app.use(getAdmin)

app.use(getAuth)


app.use(getError)

mongoose.connect(mongodb_uri).then(() => {


    app.listen(3000);

}).catch(err => console.log(err))

    


