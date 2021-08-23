const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const fileManager = require('../middleware/multer-config');       // next stage feature
const postController = require('../controllers/post');


// POST METHODS : Create post
router.post('/',    auth,   postController.create);    //fileManager,

// GET METHODS : Reach all or one post
router.get('/',     auth,   postController.getAll);
router.get('/:id',  auth,   postController.findById);

// PUT METHOD : Update post data
router.put('/:id/like', auth,   postController.like);
//router.put('/:id',  auth,   postController.modify);       // add links to comments ? or comments ?

// DELETE METHOD : Delete post by admin only
router.delete('/:id',   auth,   postController.remove);


module.exports = router;
