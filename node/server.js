const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const app = express();
const _PORT = 3000;

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)

app.use(cors());
app.use(express.json());



const routerCustomers = require('./api/shoes/shoes.router')
app.use('/shoes', routerCustomers);

 
app.listen(_PORT, (err) => {
    if (err){
        console.error({err});
    }else{
        console.log(`Servidor corriendo en el puerto ${_PORT}`);
    }
});