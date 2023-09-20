const express = require('express')
const PORT = process.env.PORT || '3008'
const app = express()
const mongoose = require("mongoose")
const blogRoute = require('./routes/blogRoute')
const adminRoute = require('./routes/adminRoute')
const cwaRoute = require('./routes/cwaRoute')

try {
    mongoose.connect('mongodb://localhost:27017/CWA')
} catch (error) {
    console.log(error.message);
}

app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views', './views')

app.use('/',blogRoute)
app.use('/',adminRoute)
app.use('/',cwaRoute)

app.get('*',(_,res)=>{
    res.render('404')
})




app.listen(PORT,()=>{
    console.log(`Server Running on "http://localhost:${PORT}"`);
})

