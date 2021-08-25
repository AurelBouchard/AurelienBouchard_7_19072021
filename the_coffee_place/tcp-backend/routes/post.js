const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const fileManager = require('../middleware/multer-config');       // next stage feature
const postController = require('../controllers/post');

//#########################################################
//    ADD auth MIDDLEWARE TO ALL ROUTES !!!!!!
//#########################################################

// POST METHODS : Create post
router.post('/',       postController.create);    //fileManager,

// GET METHODS : Reach all or one post
router.get('/',        postController.getAll);
router.get('/:id',    postController.findById);

// PUT METHOD : Update post data
router.put('/:id/like',    postController.like);
//router.put('/:id',  auth,   postController.modify);       // add links to comments ? or comments ?

// DELETE METHOD : Delete post by admin only
router.delete('/:index',      postController.remove);   // index can be id of post to be removed or pseudo of author


module.exports = router;
