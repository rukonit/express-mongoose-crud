
const express = require("express");
const app = express()
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


//models

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {
    useNewUrlParser: true
}).then(()=>{
    console.log("MONGO CONNECTION OPEN !!");
}).catch((err)=> {
    console.log("SOMETHING WENT WRONG PLEASE CHECK YOUR OR DEBUG YOUR PROGRAM");
    console.log(er);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

//consts
const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', {products })
})

app.get('/products/new', (req, res) => {
     res.render('products/new', {categories})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
 
    res.render('products/show', {product});
}) 

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true})
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    res.redirect(`/products`)
})

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories});
})



app.listen(3000, () => {console.log("APP IS LISTENING ON PORT 3000")});