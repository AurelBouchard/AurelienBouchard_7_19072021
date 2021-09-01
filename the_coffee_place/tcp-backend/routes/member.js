const express = require('express');
const router = express.Router();

const memberController = require('../controllers/member');
const auth = require('../middleware/auth');


router.get("/",         auth,   memberController.getAll);

router.get("/:pseudo",  auth,   memberController.getOne);



module.exports = router;
