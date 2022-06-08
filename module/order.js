const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema([{
    user: {
        password: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    product: [{
        productId: { 
            type: Object,
            required: true,
            
        },
        quantity: {
            type: Number,
            required: true
        }
    }]

}])

module.exports = mongoose.model('Order', OrderSchema)