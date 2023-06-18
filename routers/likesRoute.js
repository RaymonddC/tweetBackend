const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController, tweetsController, likesController } = require('./../controllers');

router.post('/:tweetId', likesController.likeCreate);
router.get('/', likesController.getAllLike);
// router.get('/sendVerifLink/:username', authController.sendVerifLink);
// router.post('/login', authController.userLogin);
// router.post('/verify', auth.verifyToken, authController.verifyUser);

// // //keepLogin (byToken)
// router.get('/getUser', auth.verifyToken, authController.getUserById);

module.exports = router;
