





// const fs = require('fs')
// const path = require('path')


// const p = path.join(__dirname, '../', 'data', 'cart.json')
// const p1 = path.join(__dirname, '../', 'data', 'mydata.json')

// module.exports = class Cart {

//   static addProduct(id, price) {

//     fs.readFile(p, (err, filecontant) => {
//       let cart = { product: [], totalPrice: 0 }
//       if (!err) {
//         cart = JSON.parse(filecontant);
//       }
//       let existingProductIndex = cart.product.findIndex(prod => prod.id === id);
//       let existingProduct = cart.product.find(prod => prod.id === id);


//       if (existingProduct) {

//         cart.product[existingProductIndex].qty = cart.product[existingProductIndex].qty + 1;
//       } else {
//         cart.product.push({ "id": `${id}`, "qty": 1 })
//       }
//       cart.totalPrice = cart.totalPrice + +price;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {

//       })

//     })
//   }
//   static fatchAll(cb) {
//     let cartItem
//     let products
//     let cartAmount
//     let arr = [];
//     let qty = {};
//     let totalPrice
//     fs.readFile(p, (err,filecontant) => {
//       if(err){
//         return
//       }
//       let cart = JSON.parse(filecontant)
//       cartItem = cart.product
//      cartAmount = cart.totalPrice
//       console.log(cartAmount)
      
//       if(cartItem){
//         fs.readFile(p1,(err,filecontant) => { 
//           products = JSON.parse(filecontant)
//           cartItem.forEach(prod => {
//           //  let qty1 = prod.qty
//            qty = {qty:prod.qty}
//            let product = products.find(p => p.id === prod.id)
//            product = Object.assign(product,qty)
//            arr.push(product)
            
//           });
//           let obj = {prod:[],totalPrice:0}
//           obj.prod = arr;
//           obj.totalPrice = cartAmount
//           cb(obj)
//         })
//       }
//     })
//   }




// }


