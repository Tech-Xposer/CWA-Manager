const blogsController = require('../controllers/blogsController')
const express = require('express')
const bodyParser = require('body-parser')
const blogRoute = express()
const auth = require('../middleware/auth')
const {getBlogbyId, getAllBlogs, viewBlog, searchbyTitle} = require('../controllers/blogsController')

blogRoute.use(express.json())
blogRoute.use(bodyParser.urlencoded({extended: true}))

blogRoute.set('view engine','ejs')
blogRoute.set('views','./views/blog')

blogRoute.get('/blogs',blogsController.loadBlogs)



blogRoute.get(
    '/blog/:permalink',
    viewBlog
)
blogRoute.get(
    '/getblogs',
    getAllBlogs
)
blogRoute.get(
    '/blogs/:_id',
    getBlogbyId
)
blogRoute.get(
    '/blog/search/:title',
    searchbyTitle
)
 


module.exports = blogRoute