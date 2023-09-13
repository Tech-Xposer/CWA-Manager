const express = require('express')
const PORT = process.env.PORT || '3008'
const app = express()
const mongoose = require("mongoose")
const userRoute = require('./routes/userRoute')

try {
    mongoose.connect('mongodb://localhost:27017/CWA')
} catch (error) {
    console.log(error.message);
}

app.use(express.static('public'))

app.use('/',userRoute)

app.get('/',(req,res)=>{
    res.send('Code With Ash')
})

app.listen(PORT,()=>{
    console.log(`Server Running on "http://localhost:${PORT}"`);
})

