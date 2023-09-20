const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')
const adminController = require('../controllers/adminController')
const config = require('../config/config')
const auth = require('../middleware/auth')

adminRoute = express()
adminRoute.set('view engine', 'ejs')
adminRoute.set('views', './views/admin')
adminRoute.use(express.json())
adminRoute.use(session({secret:config.secretKey}))
adminRoute.use(bodyParser.urlencoded({extended: false}))
adminRoute.use(session({secret:config.secretKey}))


adminRoute.get('/message',auth.isUserLogin, adminController.loadMessage )
adminRoute.get('/home',auth.isUserLogin,adminController.loadDashboard)


adminRoute.get('/register', auth.isUserLogout, adminController.loadRegister)
adminRoute.post('/register',adminController.getuserDetails)

adminRoute.get('/adminLogin',auth.isUserLogout,adminController.userLogin)
adminRoute.post('/adminLogin',adminController.validateLogin)

adminRoute.get('/verify',adminController.userVerification)
adminRoute.get('/deleteUser',adminController.deleteUser)
adminRoute.get('/logout',auth.isUserLogin,adminController.userLogout)


adminRoute.post('/search',adminController.searchUser )

module.exports = adminRoute
