const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthService = require('../services/AuthService');

router.post('/add', UserController.add_user);
router.post('/signin', UserController.user_signin);
router.post('/token', UserController.validate_token);

router.get('/email/:Email', AuthService.authorize, UserController.get_user_by_email);

module.exports = router;