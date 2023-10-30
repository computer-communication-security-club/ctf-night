const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/auth")
const {login,register,dashboard} = require("../controllers/main")
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/dashboard').get(authMiddleware,dashboard)

module.exports = router