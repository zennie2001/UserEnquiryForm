let mongoose = require('mongoose')

//creating Schema
let enquiryScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },

});


//creaing model
let enquiryModel = mongoose.model("Enquiry", enquiryScheme)

module.exports= {enquiryModel}