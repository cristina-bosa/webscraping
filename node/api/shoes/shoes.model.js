const mongoose = require('mongoose');

var ShoesSchema = mongoose.Schema({
    id: {
        type:String, 
        required: [true, "Es necesario un id"],
        unique: true,
        inmutable: true
    },
    brand: {
        type:String, 
        minlength: 1, 
        maxlength: 120,
        lowercase: true
        //required:true, 
    },
    model: {
        type:String, 
        minlength: 1, 
        maxlength: 120, 
        required: [true, "Es necesario el modelo"]
    },
    price: {
        type: Number, 
        required: true, 
    },

    urlImg: {
        type:String,
        minlength: 3, 
        //maxlength: 2000,
        unique: true

    },
    hrefDetail: {
        type:String, 
        minlength: 3, 
        //maxlength: 2000,
        required: [true, "Necesario enlace de detalles/compra"],
        unique: true
    },
    favorite: {
        type:Boolean,
        default: false
    },
});

var shoe = mongoose.model('shoe', ShoesSchema);
module.exports = shoe;