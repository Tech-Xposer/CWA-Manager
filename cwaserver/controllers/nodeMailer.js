const nodeMailer = require('nodemailer')
const mailCred = require('../config/config')
const transporter = nodeMailer.createTransport({
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

const sendMail= (userMail)=>{
        transporter.sendMail({
        from: mailCred.adminMail,
        to: userMail,
        subject: 'User Verification - CodeWithAsh',
        text: 'Please Verify your mail with following link !',
        html: `Hii, <br> Please Check Mail`   
    },(err,info)=>{
        if(err){
            console.log(err.message);
            return err.message
        }else{
            console.log('Mail has been sent Successfully:  '+info.response);
            return info
        }
    })
}
module.exports = {sendMail}
