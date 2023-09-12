const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const mailCred = require('../config/config')
const bcrypt = require('bcrypt');
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
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.render('register', { message: 'User already exists with this email' });
        } else {
            const hashPass = await hashPassword(req.body.pass);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
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

const hashPassword = async (password) => {
    try {
        const hash_pass = await bcrypt.hash(password, saltRounds);
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
            <a href="http://localhost:3008/verify?id=${id}">Verify</a>`   
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
            res.send('Verified')
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
        console.log('userData:->  '+userData);
        if(userData ){
            const passCheck = await bcrypt.compare(req.body.password, userData.password)
            if(passCheck){
                if(userData.is_verified === 1){
                    req.session.user_id = userData._id
                    res.redirect('/home')         
                }else{
                    res.render('login',{message:'Please Verify Your Mail! '})         
                }
            }else{
                res.render('login',{message:'Incorrect Credentials.. Please Try Again! '})
            }
        }else{
            res.render('login',{message:'Incorrect Credentials.. Please Try Again! '})
        }
    } catch (error) {
        
    }
}

const loadDashboard = async (req,res)=>{
    try {
        res.render('home')
    } catch (error) {
        console.log(error.message);
    }
}

const pageNotFound = (req,res)=>{
    res.render('404')
}
module.exports = { loadRegister, getuserDetails ,userVerification,pageNotFound,userLogin,validateLogin,loadDashboard};
