require('dotenv').config();
const express = require('express');
const {json}=require("body-parser");
const app = express();
const path = require("path");
const ejs = require('ejs');
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const Register = require('./db/register');
require("./db/conn");
const cors = require('cors');
const { connect } = require('http2');
const passportLocalMongoose=require("passport-local-mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const static_path = path.join(__dirname,'../public/');
app.set('view engine','ejs');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));

const hostname = '127.0.0.1';
const port = 3000;

app.get('/',(req,res)=>{
    res.render("register");
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/index',(req,res)=>{
    res.render("index");
})

app.post("/register",async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registeruser=new Register({
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })

            const token=await registeruser.generateAuthToken();

            const registered=await registeruser.save();
            res.status(201).render("login");

        }else{
            res.send("Password are not matched");
        }

    } catch (error) {
        res.status(400);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password,useremail.password);
        const token = await useremail.generateAuthToken();

        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send(`invalid credentials`);
        }
    }catch(error){
        res.status(400);
    }
});


app.listen(port,()=>{
    console.log(`http://${hostname}:${port}`);
});