const express = require('express')
const bodyParser = require('body-parser');

const userRoute = express()

const userController = require('../controllers/userController')

userRoute.use(express.json())
userRoute.use(bodyParser.urlencoded({extended: false}))
userRoute.use(express.json())
userRoute.set('view engine','ejs')
userRoute.set('views','./views')


userRoute.get('/register',userController.loadRegister)

userRoute.post('/register',userController.getuserDetails)

userRoute.get('/verify',userController.userVerification)
userRoute.get('*',userController.pageNotFound)
module.exports = userRoute 