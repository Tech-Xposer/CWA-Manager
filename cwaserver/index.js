const express = require('express');
const mongoose = require("mongoose");
const http = require('http');
const fs = require('fs')
const path = require('path')
require('dotenv').config();

const blogRoute = require('./routes/blogRoute');
const adminRoute = require('./routes/adminRoute');
const cwaRoute = require('./routes/cwaRoute');
const apiRoute = require('./routes/apiRoute');
const cors = require('./middleware/cors');

const app = express();
const PORT = process.env.PORT || 3008;

const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_USERNAME = process.env.DB_USERNAME;


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors);

app.use((req,res,next)=>{
  const text = `${Date.now()}: ${req.method} ${req.path}\n`
  fs.appendFile('log.txt',text,(err,data)=>{
    next()
  })
})
app.use('/', blogRoute);
app.use('/', adminRoute);
app.use('/', cwaRoute);
app.use('/api', apiRoute);
 

app.get('*', (req, res) => {
  
    res.status(404).render('404');
});


mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASS}@${DB_HOST}:27017/CWA?authSource=admin`)
  .then(() => {
    console.log("MongoDB connected");
    return app
  })
  .then((app) => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
