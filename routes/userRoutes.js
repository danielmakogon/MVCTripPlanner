const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.get('/', controller.getLogin);
router.get('/createNewUser', controller.newUser);
router.post('/login', controller.login);
router.post('/new', controller.create);
router.get('/profile', controller.profile);
router.get('/logout', controller.logout);
router.get('/friends', controller.getFriends);
router.post('/addFriend', controller.addFriends);

module.exports = router;