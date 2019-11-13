const express = require('express');
const {register,login,logout} = require('../controllers/auth');

const router = express.Router();

router.post('/register',register).post('/login',login);

// router.get('/me',protect,getMe);

router.get('/logout', logout);

module.exports = router;