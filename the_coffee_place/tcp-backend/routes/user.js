const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post("/login", userController.logIn);

router.post("/signup", userController.signUp);

router.delete('/deluser/:id', userController.remove);//auth








module.exports = router;
