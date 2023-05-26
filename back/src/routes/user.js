const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const multiparty=require('connect-multiparty');

const midUserImg=multiparty({uploadDir:'./src/uploads/users'});

const app=express.Router();


app.get('/users', userController.index);
app.post('/users/create',midUserImg, userController.store);
app.post('/users/login',midUserImg,userController.login);


module.exports=app;