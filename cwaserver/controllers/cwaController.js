const Contact = require('../models/contactModel')
const Skill = require('../models/skillModel')
const About = require('../models/aboutModel')

const loadHome =  async (req,res)=>{
    
    res.render('home')
}

const loadAbout =  async (req,res)=>{
    try {
        const skillsArr = await Skill.find({}).sort({percent:1})
        const about = await About.findOne({})
        if(skillsArr && about){
            res.render('about',{skillsArr, about})
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
const loadResume = async(req,res)=>{
    try {
        res.render('resume')
    } catch (error) {
        console.log('Not Found');
    }
}

module.exports = {loadHome,loadAbout,loadContact,submitMessage, loadResume}