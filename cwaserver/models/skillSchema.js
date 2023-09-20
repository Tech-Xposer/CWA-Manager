const mongoose = require('mongoose')
const skillSchema = {
    skillname:{
        type: String,
        required: true
    },
    percent:{
        type: String,
        required: true
    }
}

module.exports = mongoose.model('skills',skillSchema)