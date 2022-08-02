const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    code:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('structure',userSchema);