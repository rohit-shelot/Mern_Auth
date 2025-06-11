const userAuthCont = require('../controllers/userAuthCont')
const verifyToken = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router();

router.get('/',verifyToken,userAuthCont.profile)
module.exports = router;