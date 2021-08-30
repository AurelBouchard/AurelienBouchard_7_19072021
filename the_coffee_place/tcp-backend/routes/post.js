const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const fileManager = require('../middleware/multer-config');       // next stage feature
const postController = require('../controllers/post');

//#########################################################
//    ADD auth MIDDLEWARE TO ALL ROUTES !!!!!!
//#########################################################


router.post('/',            postController.create);    //fileManager,

router.get('/',             postController.getAll);

router.get('/:id',          postController.findById);

router.get('/:id/comments', postController.getComments);

router.put('/:id/like',     postController.addLike);

router.put('/:id/comment',  postController.addComment);

router.delete('/:index',    postController.removePost);   // index can be id of post to be removed or pseudo of author

router.delete('/comment/:index',    postController.removeComment);   // index can be id of post to be removed or pseudo of author



module.exports = router;
