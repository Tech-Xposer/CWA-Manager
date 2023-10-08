const mongoose = require('mongoose')
const skillModel = mongoose.Schema({
    skillname:{
        type: String,
        required: true
    },
    percent:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('skills',skillModel)