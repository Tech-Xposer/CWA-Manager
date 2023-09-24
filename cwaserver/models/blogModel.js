const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    metadescription:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    permalink:{
        type:String,
        required:true
    },
    author:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
        requried:true
    }
})

module.exports = mongoose.model('blogs', blogSchema)