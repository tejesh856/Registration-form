const cors = require('cors');
const path = require('path');
const express = require('express');
const mongodb = require('./db');
const app=express();
const port=5000;
mongodb().then(async () => {
    app.use(cors({
        origin:'*'
    }));
    //console.log(path.join(__dirname,'./register.html'))
    app.use(express.json());
    //app.use('/',express.static(path.join(__dirname,'./public')));
    app.use('/',express.static(path.join(__dirname,'./public')));
    //app.use('/welcome',express.static(path.join(__dirname,'./src/')));
    app.get('/welcome', (req, res) => {
         res.sendFile(path.join(__dirname,'./src/register.html'));
         //res.sendFile(path.join(__dirname,'./src/register.css'));
         
    })
    app.get('/css', (req, res) => {
        res.sendFile(path.join(__dirname,'./src/register.css'));
        //res.sendFile(path.join(__dirname,'./src/register.css'));
        
   })
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/',require('./Routes/createuser'));
    
    app.listen(port, () => {
        console.log(`registration app listening on port ${port}`);
    });

}).catch((err)=>{console.log(err)});
