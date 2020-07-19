const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes =require('./api/routes/products');
const orderRoutes =require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Mydbs')
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Alllow-Headers',
     'Orign, X-requested-With, Content-Type,Accept,Authorization'
     );
     if (req.method === 'OPTIONS') {
        res.header('Access-Control-Alllow-Methods','PUT,POST,PATCH,DELETE,GET');
       return req.status(200).json({}); 
    }
    next();
});

//routes to handle request
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next) => {
    const error = new Error('not found');
    error.statuds(404);
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
         error:{
              message:error.message
         }
    })
})
module.exports = app;