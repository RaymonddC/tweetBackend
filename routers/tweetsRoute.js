const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController, tweetsController } = require('./../controllers');
const { multerTweetImage } = require('../middleware/MulterTweet');

router.post('/', auth.verifyToken, multerTweetImage.single('image'), tweetsController.tweetCreate);
router.get('/', tweetsController.getAllTweet);
router.put('/:id', auth.verifyToken, multerTweetImage.single('image'), tweetsController.updateTweet);
router.get('/:id', auth.verifyToken, tweetsController.getTweet);
router.get('/comments/:id', auth.verifyToken, tweetsController.getCommentsTweet);
router.delete('/:id', auth.verifyToken, tweetsController.deleteTweet);
// router.get('/sendVerifLink/:username', authController.sendVerifLink);
// router.post('/login', authController.userLogin);
// router.post('/verify', auth.verifyToken, authController.verifyUser);

// // //keepLogin (byToken)
// router.get('/getUser', auth.verifyToken, authController.getUserById);

module.exports = router;
