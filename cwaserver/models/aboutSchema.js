const mongoose = require('mongoose')

const aboutSchema = {
    intro:{
        type: String,
        required: true
    },
    desgination:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    website:{
        type: String,
        required: true
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
    }
}