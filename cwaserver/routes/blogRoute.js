const blogsController = require('../controllers/blogsController')
const express = require('express')
const bodyParser = require('body-parser')
const blogRoute = express()
const auth = require('../middleware/auth')

blogRoute.use(express.json())
blogRoute.use(bodyParser.urlencoded({extended: true}))

blogRoute.set('view engine','ejs')
blogRoute.set('views','./views/blog')

blogRoute.get('/blogs',blogsController.loadBlogs)


blogRoute.get('/blog/:permalink',blogsController.viewBlog)
blogRoute.get('/blog/search/:title',blogsController.searchbyTitle)


blogRoute.get('/insertblog',auth.isUserLogin,blogsController.insertBlogLoad)
blogRoute.post('/insertblog',auth.isUserLogin,blogsController.upload.single('blogImage'),blogsController.insertBlog)



module.exports = blogRoute