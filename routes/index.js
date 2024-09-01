const express = require('express');
const { getUsers, Register, Login, Logout, updateUser, getUserById, deleteUser, updateImage, upload } = require('./controller/User.js');
const  VerifyToken  = require('./middleware/VerifyToken.js');
const { TambahBanner, TambahService, getBanner, getService } = require('./controller/information.js');
const { GetAmount, GetHistory, TambahTransaction, TopUpAmount } = require('./controller/Transactions.js');


const app = express.Router();

//user
app.get('/users', VerifyToken, getUsers);
app.get('/users/:id', VerifyToken, getUserById);
app.delete('/users/:id', VerifyToken, deleteUser);
app.put('/users/:id', VerifyToken, updateUser);
app.put('/images/:id', upload.single('profileImage'), VerifyToken, updateImage);
app.post('/register', Register);
app.post('/login', Login);
app.delete('/logout', Logout);

//Banner
app.post('/banner', VerifyToken, TambahBanner);
app.get('/banner', VerifyToken, getBanner);

//Service
app.post('/service', VerifyToken, TambahService);
app.get('/service', VerifyToken, getService);

//Transaction
app.post('/transaction', VerifyToken, TambahTransaction);
app.post('/topUp', VerifyToken, TopUpAmount);
app.get('/transaction', VerifyToken, GetAmount);
app.get('/history', VerifyToken, GetHistory);

module.exports = app;
