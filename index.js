const express = require('express')
const PORT = '3008' || process.env.PORT
const app = express()
const mongoose = require("mongoose")
const userRoute = require('./routes/userRoute')
mongoose.connect('mongodb://localhost:27017/CWA')

app.use(express.static('public'))

app.use('/',userRoute)

app.get('/',(req,res)=>[
    res.send('Code With Ash')
])

app.listen(PORT,()=>{
    console.log(`Server Running on "http://localhost:${PORT}"`);
})