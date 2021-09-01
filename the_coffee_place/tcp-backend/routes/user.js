const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup',              userController.signUp);

router.post('/login',               userController.logIn);

router.get('/:pseudo',              auth,   userController.getFullProfile);     //auth

router.get('/:pseudo/likedposts',   auth,   userController.getLikedPosts);      //auth

router.put('/update/:id',           auth,   userController.update);     //auth

router.put('/updatePW/:id',         auth,   userController.updatePW);     //auth

router.put('/setadmin/:pseudo',     auth,   userController.setAdmin);   // auth

router.delete('/deluser/:id',       auth,   userController.remove);     //auth




module.exports = router;
