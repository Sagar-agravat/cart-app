const req = require('express/lib/request')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    resetToken: String,
    resetExpairy: String,
    cart: {
        items: [{

            productId: {
                type: Schema.Types.ObjectId,
                required: true, 
                ref: 'Product'
            },
            qty: {
                type: Number,
                required: true
            }
        }]
        
    }

})

UserSchema.methods.addToCart = function(productId) {
    

    const productIndex = this.cart.items.findIndex(item => item.productId.toString() === productId.toString())
    let updatedItems = [...this.cart.items]
    if (productIndex >=0){
        this.cart.items[productIndex].qty = this.cart.items[productIndex].qty + 1
        
    }else{
        updatedItems.push({productId: productId, qty: 1})
       
    }
    this.cart.items = updatedItems;
    return this.save()
}

UserSchema.methods.deletFromCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product.toString())
    this.cart.items.splice(cartProductIndex, 1)
    return this.save()
}


UserSchema.methods.clearCart = function() {
    this.cart.items = []
    return this.save()
}

module.exports = mongoose.model('User', UserSchema)