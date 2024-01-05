const mongoose = require('mongoose');
const { Schema }=mongoose;
const userschema = new Schema({
// String is shorthand for {type: String}
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    cpassword: {
        type:String,
        required:true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
  });
  module.exports=mongoose.model('user',userschema);