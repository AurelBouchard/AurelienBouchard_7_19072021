const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup',              userController.signUp);

router.post('/login',               userController.logIn);

router.get('/:pseudo',              userController.getFullProfile);     //auth

router.get('/:pseudo/likedposts',   userController.getLikedPosts);      //auth

router.put('/update/:id',           userController.update);     //auth

router.put('/updatePW/:id',         userController.updatePW);     //auth

router.delete('/deluser/:id',       userController.remove);     //auth




module.exports = router;
