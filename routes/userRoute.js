const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')
const userRoute = express()
const userController = require('../controllers/userController')
const config = require('../config/config')
const auth = require('../middleware/auth')

userRoute.use(session({secret:config.secretKey}))

userRoute.use(express.json())
userRoute.use(bodyParser.urlencoded({extended: false}))

userRoute.set('view engine','ejs')
userRoute.set('views','./views')


userRoute.get('/register', auth.isUserLogout, userController.loadRegister)
userRoute.post('/register',userController.getuserDetails)

userRoute.get('/',auth.isUserLogout,userController.userLogin)
userRoute.post('/',userController.validateLogin)

userRoute.get('/verify',userController.userVerification)
userRoute.get('/home',auth.isUserLogin,userController.loadDashboard)
userRoute.get('*',userController.pageNotFound)
module.exports = userRoute 