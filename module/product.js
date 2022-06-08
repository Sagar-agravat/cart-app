const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema ({
    title: { 
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    } 
})


module.exports = mongoose.model('Product', ProductSchema)

















// const { error } = require('console');
// const fs = require('fs')
// const path = require('path')



// module.exports = class Product {
//     constructor(productId, Title, Price, Discription) {

//         this.title = Title
//         this.price = Price
//         this.discription = Discription

//     }

//     save() {


//         fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'), (error, filecontant) => {

//             let allProducts = [];
//             if (!error) {

//                 allProducts = JSON.parse(filecontant)
//             }

//             let obj = {
//                 id: Math.random(this.Id).toString(),
//                 title: this.title,
//                 price: this.price,
//                 discription: this.discription
//             }
//             // console.log('?????????????????????????????????????????????????????', obj)
//             allProducts.push(obj);
//             fs.writeFile(path.join(__dirname, '../', 'data', 'mydata.json'), JSON.stringify(allProducts), (error) => {

//             })

//         })

//     }

//     static fatchById(productId, cb) {
//         let id = productId
//         let allProductsID
//         fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'), (error, filecontant) => {
//             let allProducts = JSON.parse(filecontant)
//             //    console.log(allProducts)

//             allProductsID = allProducts.find(p => p.id === id)
//             //    console.log('...............',allProductsID)
//             cb(allProductsID)
//         })




//     }
//     static deleteById(productId, cb) {

//         let id = productId
//         let allProductsID
//         fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'), (error, filecontant) => {
//             let allProducts = JSON.parse(filecontant)
//             //    console.log(allProcccccccccducts)

//             // console.log('...............id', id)
//             allProductsID = allProducts.findIndex(p => p.id === id)

//             allProducts.splice(allProductsID, 1)
//             fs.writeFile(path.join(__dirname, '../', 'data', 'mydata.json'), JSON.stringify(allProducts), (error) => {
//                 console.log(error)

//             })
//             cb('done')

//         })




//     }

//     static getProductById( productId , cb ) {
//         fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'), (error,filecontant) => {
//             let allProducts = JSON.parse(filecontant)
//             let id = productId

//             let editProduct = allProducts.find(p => p.id === id)
//             console.log(editProduct)
//             cb(editProduct)
//         })

//     }

//     static fatchProduct(cb) {
//         fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'), (error, filecontant) => {
//             let allProducts = [];
//             if (!error) {

//                 allProducts = JSON.parse(filecontant)
//             } else {
//                 cb(fs.writeFile(path.join(__dirname, '../', 'data', 'mydata.json'), JSON.stringify(allProducts), (error) => {
//                     console.log(error)

//                 }))
//             }

//             cb(allProducts);

//         })
//     }

// static editedProduct(productId,title,price,disc,cb) {
//     fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'),(error,filecontant) => {
//         console.log('111111111111111111111111111===', productId,title,price,disc)

//         let allProduct = JSON.parse(filecontant)
//         let product = allProduct.findIndex(p => p.id === productId)
//         console.log('>>>>>>>>>>>', product)
//         allProduct[product].title = title
//         allProduct[product].price = price
//         allProduct[product].discription = disc

//         fs.writeFile(path.join(__dirname, '../', 'data', 'mydata.json'), JSON.stringify(allProduct), (error) => {
//             console.log(error)

//         })
//         cb('done')
//     })



// }

// static addItemToCart(productId , cb) {
//     fs.readFile(path.join(__dirname, '../', 'data', 'mydata.json'),(error,filecontant) => {
//         // console.log('111111111111111111111111111===', productId,title,price,disc)

//         let allProduct = JSON.parse(filecontant)
//         let product = allProduct.find(p => p.id === productId)
//         // fs.readFile(path.join(__dirname, '../', 'data', 'cart.json'), (error,filecontant) => {
//         // let cartproduct = [];
//         // if(!error){
//         //     cartproduct = JSON.parse(filecontant)
//         // }
//         // cartproduct.push(product)
        
//         // fs.writeFile(path.join(__dirname, '../', 'data', 'cart.json'), JSON.stringify(cartproduct), (error) => {
//         //     console.log(error)
//         //  })
//          cb(product)
//     // })

// })
// }

// }