const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.get('/user/:pseudo', userController.getFullProfile);

router.put('/update/:id', userController.update);//auth

router.delete('/deluser/:id', userController.remove);//auth




module.exports = router;
