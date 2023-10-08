const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')
const adminController = require('../controllers/adminController')
const blogsController = require('../controllers/blogsController')
const config = require('../config/config')
const auth = require('../middleware/auth');
const { Admin } = require('mongodb');

adminRoute = express()
adminRoute.set('view engine', 'ejs')
adminRoute.set('views', './views/admin')
adminRoute.use(express.json())
adminRoute.use(session({secret:config.secretKey}))
adminRoute.use(bodyParser.urlencoded({extended: false}))
adminRoute.use(session({secret:config.secretKey}))


adminRoute.get('/admin/messages',auth.isUserLogin, adminController.loadMessage )
adminRoute.get('/admin/messagesbyno',auth.isUserLogin, adminController.pagination )
adminRoute.get('/admin/home',auth.isUserLogin,adminController.loadDashboard)
adminRoute.post('/admin/sendmail',auth.isUserLogin,adminController.sendMail)
adminRoute.get('/admin/blog/insert',auth.isUserLogin,adminController.loadinsertBlog)
adminRoute.post('/admin/blog/insert',(auth.isUserLogin,blogsController.upload.single('blogImage')),blogsController.insertBlog)

adminRoute.get('/admin/blog',auth.isUserLogin,blogsController.loadBlogs)

adminRoute.delete('/admin/blog/delete/:_id',auth.isUserLogin,blogsController.deleteBlog)


adminRoute.get('/register', auth.isUserLogin, adminController.loadRegister)
adminRoute.post('/register',auth.isUserLogin,adminController.getuserDetails)

adminRoute.get('/adminLogin',auth.isUserLogout,adminController.userLogin)
adminRoute.post('/adminLogin',auth.isUserLogout, adminController.validateLogin)

adminRoute.get('/verify',adminController.userVerification)
adminRoute.delete('/admin/deleteMessage/:_id',adminController.deleteMessage)
adminRoute.get('/admin/logout',auth.isUserLogin,adminController.userLogout)


adminRoute.post('admin/search',auth.isUserLogin,adminController.searchUser )

module.exports = adminRoute
