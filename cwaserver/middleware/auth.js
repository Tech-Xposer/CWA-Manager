const isUserLogin = async(req,res,next)=>{
    try {
        if(!req.session.user_id){
            return res.redirect('/adminLogin')
        }
        next()
    } catch (error) {
        console.log('Error is User Login Method'+error.message);
    }
}
const isUserLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            return res.redirect('/admin/home')
        }
        
        next()
    } catch (error) {
        console.console.log('Error is User LogOut Method'+error.message);
    }
}


module.exports = {isUserLogin,isUserLogout}