const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    productname: {
        type: String,
        required: true
},
    price:{
        type:Number,
        required:true
},
    description:{
        type:String,
        required:true
},
    size:{
        type:String
    },inventory:{
        type:Number,
        required:true
    }


});

module.exports = mongoose.model('Product',userSchema);