const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const mailCred = require('../config/config')
const bcrypt = require('bcrypt');
const session = require('express-session');
const saltRounds = 10;


const loadRegister = (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message);
    }
};
const getuserDetails = async (req, res) => {
    try {
        const name= req.body.name
        const email= req.body.email
        const mobile= req.body.mobile
        const password= req.body.password
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.render('register', { message: 'User already exists with this email' });
        } else {
            const hashPass = await hashPassword(password);
            const user = new User({
                name: name,
                email: email,
                mobile: mobile,
                password: hashPass,
                is_admin: 0
            });

            const result = await user.save();

            if (result) {
                verifyEmail(req.body.email,req.body.name,result._id)
                res.render('register', { message: 'Registered Successfully. Please verify your email' });
            } else {
                res.render('register', { message: 'Registration Unsuccessful' });
            }
        }
    } catch (error) {
        console.log('Error Message ' + error.message);
    }
};

const hashPassword = async (pass) => {
    try {
        const hash_pass = await bcrypt.hash(pass, saltRounds);
        return hash_pass;
    } catch (error) {
        console.log('Error hashing password: ' + error.message);
        throw error;
    }
};
const verifyEmail = async (eMail,name,id) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            secureConnection:false,
            auth: {
                user: mailCred.adminMail,
                pass: mailCred.appPassword
            },
            tls:{
                rejectUnauthorized:true
            }
        })
        transporter.sendMail({
            from: mailCred.adminMail,
            to: eMail,
            subject: 'User Verification - CodeWithAsh',
            text: 'Please Verify your mail with following link !',
            html: `<h2>Hi, ${name}</h2></br><p>Please click on the following link to verify your email address:</p>
            <a href="/verify?id=${id}">Verify</a>`   
        },(err,info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log('Mail has been sent Successfully:  '+info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
const userVerification = async(req,res)=>{
    try {
        const checkAlreadyVerified = await User.findOne({_id:req.query.id})
        if(checkAlreadyVerified.is_verified==1){
            res.send('User Already Verified')
        }else{
            const updateInfo = await User.updateOne({_id:req.query.id},{ $set:{is_verified:1}})
            if(updateInfo){
                res.redirect('/login')
            }
        }
    } catch (error) {
        res.send('Error')
        console.log(error);
    }
}

const userLogin = async(req,res)=>{
    res.render('login')
}

const validateLogin = async(req,res)=>{
    try {
        const userData = await User.findOne({email:req.body.email})
        
        if(userData ){
            const passCheck = await bcrypt.compare(req.body.password, userData.password)
            if(passCheck){
                if(userData.is_verified === 1 ){
                    if( userData.is_admin === 1){
                        req.session.user_id = userData._id
                        res.redirect('/home') 
                    }else{
                        res.render('login',{message:'Sorry! Only Admin Can Login '})    
                    }
                }else{
                    res.render('login',{message:'Please Verify Your Mail! '})         
                }
            }else{
                res.render('login',{message:'Incorrect Credentials.. Please Try Again! '})
            }
        }else{
            res.render('login',{message:'Account not Found.. Please Register first or Try Again! '})
        }
    } catch (error) {
        
    }
}

const loadDashboard = async (req,res)=>{
    try {
        const userData = await User.find()
        res.render('admin/dashboard',{userData})
    } catch (error) {
        console.log(error.message);
    }
}
const userLogout = async(req,res)=>{
    try {
        req.session.destroy()
        res.redirect('/login')
    } catch (error) {
        console.log(error.message)
    }
}

const deleteUser = async (req,res)=>{
    try {
        const deleteData = await User.deleteOne({id:req.body.id})
        if(deleteData){
            res.redirect('/home')
        }
    } catch (error) {
        console.log(error.message)
    }
}

const pagination = async (req,res)=>{
    const skip = req.query.skip;
    const data = await User.find({}).skip(skip).limit(10)
}

const searchUser = async(req,res)=>{
    try{
        
        const userName = req.body.name
        const searchData = await User.find({ name: new RegExp(userName) }, { _id: 0, is_admin: 0 });
        if(searchData){
            res.send({searchData})
        }
    }catch(err){
        console.log(err);
    }
}

const pageNotFound = (req,res)=>{
    res.render('404')
}
module.exports = { loadRegister, getuserDetails ,userVerification,pageNotFound,userLogin,validateLogin,loadDashboard, userLogout,deleteUser,searchUser};
