const mongoose = require('mongoose')

const contactSchema = {
    name:{
        type : String,
        required: true       
    },
    email:{
        type: String,
        required : true
    },
    subject:{
        type: String,
        required : true
    },
    message:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default : Date.now
    }
}
module.exports = mongoose.model('contact', contactSchema)