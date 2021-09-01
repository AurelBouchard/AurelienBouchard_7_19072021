const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const fileManager = require('../middleware/multer-config');       // next stage feature
const postController = require('../controllers/post');

//#########################################################
//    ADD auth MIDDLEWARE TO ALL ROUTES !!!!!!
//#########################################################


router.post('/',            auth,   postController.create);    //fileManager,

router.get('/',             auth,   postController.getAll);

router.get('/:id',          auth,   postController.findById);

router.get('/:id/comments', auth,   postController.getComments);

router.put('/:id/like',     auth,   postController.addLike);

router.put('/:id/comment',  auth,   postController.addComment);

router.delete('/:index',    auth,   postController.removePost);   // index can be id of post to be removed or pseudo of author

router.delete('/comment/:index',    auth,   postController.removeComment);   // index can be id of a comment to be removed or pseudo of author



module.exports = router;
