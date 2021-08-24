const express = require('express');
const router = express.Router();

const memberController = require('../controllers/member');
const auth = require('../middleware/auth');


router.get("/", memberController.getAll);//auth

router.get("/:pseudo", memberController.getOne);//auth



module.exports = router;
