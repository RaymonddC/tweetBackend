const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController } = require('./../controllers');

router.post('/register', authController.userCreate, authController.sendVerifLink);
router.get('/sendVerifLink/:username', authController.sendVerifLink);
router.post('/login', authController.userLogin);
router.post('/verify', auth.verifyToken, authController.verifyUser);

// //keepLogin (byToken)
router.get('/getUser', auth.verifyToken, authController.getUserById);

module.exports = router;
