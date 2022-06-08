const path = require('path');
const Product = require('../module/product');

// const product = require('../module/product');
const User = require('../module/user');
// const user = require('../module/user');
const Order = require('../module/order');
const product = require('../module/product');


let cls
let obj;

exports.getShopPage = (req, res, next) => {
   Product.find().then(products => {
       res.render(path.join(__dirname, '../', 'views', 'product'),{ cls: '/product', obj:products, isAuthenticated: req.session.isloggedin})
    })
}




exports.getProductPage = (req, res, next) => {

    res.render(path.join(__dirname, '../', 'views', 'shop'), { cls: '/', isAuthenticated: req.session.isloggedin })
}


 


exports.getProductDetailPage = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId).then(product => {
        res.render(path.join(__dirname, '../', 'views', 'product-detail'), {  cls: '', obj:product, isAuthenticated: req.session.isloggedin })
    })
}

   


  
    


exports.deletePage = (req, res, next) => {
 const productId = req.params.productId
 Product.findByIdAndRemove(productId).then(() => {
     req.user.deletFromCart(productId).then(() => {
         res.redirect('/admin-product')
        })

    })
}

      



exports.editProductPage = (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId).then(product => {
        res.render(path.join(__dirname, '../', 'views', 'edit-product'), {obj: product, isAuthenticated: req.session.isloggedin} )
    })
}

  
exports.posteditedProduct = (req, res, next) => {
    const productId = req.params.productId
    const updatedTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedImageUrl = req.body.imageUrl
    const updatedDiscription = req.body.discription
setTimeout(() => {
    Product.findById(productId).then(product => {
        product.title = updatedTitle
        product.price = updatedPrice
        product.imageUrl = updatedImageUrl
        product.discription = updatedDiscription
        product.save()
    }).then(() => {
        res.redirect('/admin-product')
    })
},10);
    
}



   


exports.getOrderPage = (req,res,next) => {
    Order.find().populate('product.productId').then(result => {
               
        res.render(path.join(__dirname, '../', 'views', 'order'), { cls: '/order', obj: result, isAuthenticated: req.session.isloggedin})
    })
  
}



exports.getOrder1Page = (req, res, next) => {
    req.user.populate('cart.items.productId').then(result => {
        const product = result.cart.items.map(item => {
            
            return {productId: { ...item.productId._doc }, quantity: item.qty}
        })
        
        const order = new Order({
            user: {
                password: req.user.password,
                userId: req.user._id
            },
            
            product: product
            
    
        })
       
        order.save().then(result => {
            req.user.clearCart().then(() => {
                Order.find().populate('product.productId').then(result => {
                    res.redirect('/order')
                    // res.render(path.join(__dirname, '../', 'views', 'order'), { cls: '/order', obj: result})
               
                })
            })
            
        })
    })
    
 }




exports.getCartPage = (req, res, next) => {
    
    const cart = req.user.cart.items
    let total = 0;
   req.user.populate('cart.items.productId').then(result => {
       result.cart.items.forEach(item => {
            total = total + item.productId.price*item.qty
       })
    }).then(() => {
     res.render(path.join(__dirname, '../', 'views', 'cart'), { cls: '/cart', obj:cart, total: total, isAuthenticated: req.session.isloggedin })
  })
 }






exports.getAddproductPage = (req, res, next) => {
    
    res.render(path.join(__dirname, '../', 'views', 'add-product'), { cls: '/add-product',  isAuthenticated: req.session.isloggedin})

}



exports.postProduct = (req, res, next) => {
    // console.log('this is the added product', req.body)
    const title = req.body.title
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const discription = req.body.discription
    const userId = req.user._id
    console.log(imageUrl)
    
    const product = new Product({title:title, price:price, imageUrl:imageUrl, discription:discription, userId:userId})
    product.save().then(result => {
        res.redirect('/product')
    })
}

        
    




exports.getAdminproductPage = (req, res, next) => {
Product.find().then(products => {
    res.render(path.join(__dirname, '../', 'views', 'admin-product'), { cls: '/admin-product', obj:products, isAuthenticated: req.session.isloggedin })
    })
}

    






exports.getAddToCart = (req, res, next) => {
    const productId = req.params.productId
   
    req.user.addToCart(productId).then(() => {
        res.redirect('back')
    })
   }






exports.postDeletCart = (req,res,next) => {
    req.user.deletFromCart(product).then(() => {
        res.redirect('back')
    })
}




   
    
