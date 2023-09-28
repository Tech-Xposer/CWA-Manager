const express = require('express')
const PORT = process.env.PORT || '3008'
const app = express()
const mongoose = require("mongoose")
const blogRoute = require('./routes/blogRoute')
const adminRoute = require('./routes/adminRoute')
const cwaRoute = require('./routes/cwaRoute')
const config = require('./config/config')
const axios = require('axios')
try {
    // mongoose.connect(`mongodb://${config.dbUsername}:${config.dbPass}@${config.dbHost}:27017/CWA?authSource=admin`)
    mongoose.connect(`mongodb://admin:Dev.ash%4073@43.205.240.22:27017/codewithash?authSource=admin`)
} catch (error) {
    console.log(error.message);
}

app.use(express.static('public'))
app.use(express.json())
app.set('view engine','ejs')
app.set('views', './views')

app.use('/',blogRoute)
app.use('/',adminRoute)
app.use('/',cwaRoute)

app.get('/animal',async (_,res)=>{
    const data = await axios.get('https://www.codewithash.blog/blog/search/node')
    console.log(data);
    res.send(data.s)
})
app.get('*',(_,res)=>{
    res.render('404')
})




app.listen(PORT,()=>{
    console.log(`Server Running on "http://localhost:${PORT}"`);
})

