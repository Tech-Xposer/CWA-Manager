const isUserLogin = async(req,res,next)=>{
    try {
        if(!req.session.user_id){
            return res.status(400).redirect('/adminLogin')
        }
        next()
    } catch (error) {
        console.log('Error is User Login Method'+error.message);
        res.status(400).send('Bad Request')
    }
}
const isUserLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            return res.redirect('/admin/home')
        }
        
        next()
    } catch (error) {
        console.log('Error is User LogOut Method'+error.message);
        res.status(400).send('Bad Request')

    }
}


module.exports = {isUserLogin,isUserLogout}