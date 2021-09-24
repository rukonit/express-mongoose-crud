const mongoose = require('mongoose');

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {
    useNewUrlParser: true
}).then(()=>{
    console.log("MONGO CONNECTION OPEN !!");
}).catch((err)=> {
    console.log("SOMETHING WENT WRONG PLEASE CHECK YOUR OR DEBUG YOUR PROGRAM");
    console.log(er);
})

// const p = new Product({
//     name: 'Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(p => {
//     console.log(p);
// })
// .catch(e => {
//     console.log(e);
// })

const seedProducts = [
    {
            name: 'Organic Grapefruit',
            price: 3.99,
            category: 'fruit'
        },
        {
            name: 'Red Mango',
            price: 0.99,
            category: 'fruit'
        },
        {
            name: 'Cauliflower',
            price: 3.49,
            category: 'vegetable'
        }


]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
})