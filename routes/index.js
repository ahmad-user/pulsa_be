const express = require('express');
const path = require('path');
// const { getUsers, Register, Login, Logout, updateUser, getUserById, deleteUser, updateImage, upload } = require('../controller/User.js');
// const  VerifyToken  = require('../middleware/VerifyToken.js');
// const { TambahBanner, TambahService, getBanner, getService } = require('../controller/information.js');
// const { GetAmount, GetHistory, TambahTransaction, TopUpAmount } = require('../controller/Transactions.js');

const Users = require('../models/UserModels.js');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express.Router();

//user
// app.get('/users', VerifyToken, getUsers);
// app.get('/users/:id', VerifyToken, getUserById);
// app.delete('/users/:id', VerifyToken, deleteUser);
// app.put('/users/:id', VerifyToken, updateUser);
// app.put('/images/:id', upload.single('profileImage'), VerifyToken, updateImage);
// app.post('/register', Register);
app.post('/login', async(req, res)=>{

    try{
        const user = await Users.findAll({
            where:{
                email: req.body.email,
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){

         return res.status(401).json({
          status: 103,
          message: "password salah",
          data: null
        });
      }
        const userId = user[0].id;
        const email = user[0].email;
        const password = user[0].password;
        const accessToken = jwt.sign({userId, email, password}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '12h'
    });
    res.status(200).json({ 
      status: 0,
      message: "Login Sukses",
      data: accessToken
    });
    } catch(error){
        res.status(404).json({
          status: 102,
          message: 'Parameter Email Tidak Sesuai Format',
          data : null
        });
    }
});
// app.delete('/logout', Logout);

//Banner
// app.post('/banner', VerifyToken, TambahBanner);
// app.get('/banner', VerifyToken, getBanner);

//Service
// app.post('/service', VerifyToken, TambahService);
// app.get('/service', VerifyToken, getService);

//Transaction
// app.post('/transaction', VerifyToken, TambahTransaction);
// app.post('/topUp', VerifyToken, TopUpAmount);
// app.get('/transaction', VerifyToken, GetAmount);
// app.get('/history', VerifyToken, GetHistory);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

module.exports = app;
