const express = require('express')
const bodyParser = require('body-parser')
const cwaRoute = express()
const cwaController = require('../controllers/cwaController')

cwaRoute.use(bodyParser.urlencoded({extended: true}))
cwaRoute.use(express.json())

cwaRoute.set('view engine', 'ejs')
cwaRoute.set('views', './views/cwa')

cwaRoute.get('/',cwaController.loadHome)
cwaRoute.get('/about',cwaController.loadAbout)
cwaRoute.get('/contact',cwaController.loadContact)
cwaRoute.post('/contact',cwaController.submitMessage)



module.exports = cwaRoute