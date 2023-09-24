const User = require('../models/userModel');
const Contact = require('../models/contactModel')
const nodemailer = require("nodemailer");
const mailCred = require('../config/config')
const bcrypt = require('bcrypt');
const session = require('express-session');
const saltRounds = 10;
const mailer = require('./nodeMailer')

const loadMessage = async (req,res)=>{
    const allMessages = await Contact.find({}).sort('date')
    if(allMessages){
        res.render('messages',{allMessages})
    }
    else{
        res.render('messages')
    }
}


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
            if(updateInfo){
                res.redirect('/adminLogin')
            }
        }
    } catch (error) {
        res.send('Error')
        console.log(error);
    }
}

const userLogin = async(req,res)=>{
    
    try {
        res.render('login')
    } catch (error) {
        console.error(error.message);
        res.status(404).render('404',{ message: 'Internal Server Error' });
    }
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
                        res.redirect('/admin/home') 
                    }else{
                        console.log('Sorry! Only Admin Can Login ');
                        res.render('login',{message:'Sorry! Only Admin Can Login '})    
                    }
                }else{
                    console.log('Please Verify Your Mail! ');
                    res.render('login',{message:'Please Verify Your Mail! '})         
                }
            }else{
                console.log('Incorrect Credentials.. Please Try Again! ');
                res.render('login',{message:'Incorrect Credentials.. Please Try Again! '})
            }
        }else{
            console.log('Account not Found.. Please first or Try Again!');
            res.render('login',{message:'Account not Found.. Please Register first or Try Again! '})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const loadDashboard = async (req,res)=>{
    try {
        res.render('dashboard')      
    }catch (error) {
          console.error(error.message);
          res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    
const userLogout = async(req,res)=>{
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
    }
}

const deleteMessage = async (req, res) => {
    try {
      console.log(req.params._id);
      const messageId = req.params._id; 
  
      const deleteData = await Contact.deleteOne({ _id: messageId });
  
      if (deleteData.deletedCount === 1) {
        res.redirect('/admin/messages')
      
      } else {
        res.status(404).send({ message: 'Message not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

const pagination = async (req,res)=>{
    try {
        if(req.query.skip){
            const allMessages = await Contact.find({}).skip(req.query.skip).limit(5)
            res.render('messages',{allMessages,skip:req.query.skip})
    
        }else{
            const allMessages = await Contact.find({}).skip(0).limit(5)
            res.render('messages',{allMessages,skip:0})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const searchUser = async(req,res)=>{
    try{
        
        const userName = req.body.name
        const searchData = await User.find({ name: new RegExp(userName) }, { _id: 0, is_admin: 0 });
        if(searchData){
            res.send({searchData})
        }else {
            res.status(404).send({ message: 'Message not found' });
        }
    }catch(err){
        console.log(err)
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const sendMail = async(req,res)=>{
    try {
        mailer.sendMail(req.body.email)
        res.status(200).send('Sent Successfully')
    } catch (error) {
        res.status(404).send(error)
    }
}

const loadinsertBlog = async(req,res)=>{
    try {
      res.status(200).render('insertblog')
    } catch (error) {
      res.status(404).send('Page Not Found')
    }
  }

module.exports = {loadMessage, loadRegister, getuserDetails ,userVerification,userLogin,validateLogin,loadDashboard, userLogout,deleteMessage,searchUser,pagination,sendMail,loadinsertBlog};

