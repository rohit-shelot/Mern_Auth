const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers.js')
const { loginSchema,registerSchema } = require('../middleware/ensureFields.js')

router.post('/login',loginSchema,userController.login)
router.post('/logout',userController.logout)
router.post('/signup',registerSchema,userController.register)

module.exports = router;