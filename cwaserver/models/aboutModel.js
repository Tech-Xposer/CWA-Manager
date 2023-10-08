const mongoose = require('mongoose')

const aboutModel = mongoose.Schema({
    intro:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    mobile:{
        type: String,  
        required:true 
    },
    website:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required : true
    },
    image:{
        type: String,
        required : true
    },
    para:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        requried: true
    },projects:{
        type: Number,
        required:true
    },
    hrs_work:{
        type:Number,
        required: true
    }
})
module.exports = mongoose.model('about',aboutModel)