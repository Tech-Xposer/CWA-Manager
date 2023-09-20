const blogsController = require('../controllers/blogsController')
const express = require('express')
const bodyParser = require('body-parser')
const blogRoute = express()


blogRoute.use(express.json())
blogRoute.use(bodyParser.urlencoded({extended: true}))

blogRoute.set('view engine','ejs')
blogRoute.set('views','./views/blog')

blogRoute.get('/blogs',blogsController.showBlogs)


blogRoute.get('/blogs/:title',blogsController.searchbyTitle)
blogRoute.get('/blogview',blogsController.getBlogbyId)

blogRoute.get('/insertblog',(req,res)=>{
    res.render('insertblog')
})
blogRoute.post('/insertblog',blogsController.upload.single('blogImage'),blogsController.insertBlog)



module.exports = blogRoute