const Blogs = require('../models/blogModel');
const User = require('../models/userModel');
const multer = require('multer')
const { format } = require('date-fns'); // Import the format function from date-fns

const loadBlogs = async (req, res) => {
  try {
    const blogData = await Blogs.find({ }).sort( );
    if (blogData) {
      res.render('blog', { blogData });
    }
  } catch (error) {
    console.log(error);
  }
};

const getBlogbyId = async (req,res)=>{
    try {
        const blogId = req.query.id
        const blogData = await Blogs.findOne({_id:blogId})
        if(blogData){
            // res.send(blogData)
            res.render('blogview',{blogData})
        }
    } catch (error) {
        console.log(error);
    } 
}



const searchbyTitle = async(req,res)=>{
  try{    
      const blogName = req.params.title  
      console.log(blogName);
      const blogData = await Blogs.find({ title: new RegExp(blogName,'i') });
      if(blogData.length!=0){
          res.render('blog',{blogData})
      }else{
        res.render('blog')
      }
  }catch(err){
      console.log(err);
  }
}

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    return cb(null,"./public/blogUploads")
  },filename:(req,file,cb)=>{
    return cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({storage:storage})

const insertBlog = async (req,res)=>{
  try {
    const blog = new Blogs(req.body)
    blog.permalink = req.body.title.toLowerCase().replaceAll(" ","-")
    blog.permalink.replaceAll("?","")
    blog.image = req.file.filename
    const data = await blog.save()
    if(data){
      res.redirect('/admin/blog')
    }
  } catch (error) {
    console.log(error);
  }
}

const insertBlogLoad = async(req,res)=>{
  try {
    res.render('insertblog')
  } catch (error) {
    res.status(404).render('404')
  }
}

const viewBlog = async(req,res)=>{
  try{    
      const blogData = await Blogs.findOne(req.params);
      console.log(req.params);
      res.render('blogview',{blogData})
  }catch(err){
      console.log(err);
      res.status(404).send('blogs')
  }
}


module.exports = { loadBlogs, getBlogbyId ,searchbyTitle,insertBlog,upload,viewBlog ,insertBlogLoad};
