const Contact = require('../models/contactModel')
const Skill = require('../models/skillSchema')

const loadHome =  async (req,res)=>{
    res.render('home')
}

const loadAbout =  async (req,res)=>{
    try {
        const skillsArr = await Skill.find({}).sort({percent:1})
        if(skillsArr){
            res.render('about',{skillsArr})
        }
    } catch (error) {
        console.log(error);
    }
}

const loadContact = async (req,res)=>{
    res.render('contact')
}

const submitMessage = async(req,res)=>{
    
    try {
        const message= new Contact(req.body)
        const result = await message.save()
        console.log(result);
        if(result){
            res.redirect('/')
        }
    } catch (error) {
        
    }
}

module.exports = {loadHome,loadAbout,loadContact,submitMessage}