const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthService = require('../services/AuthService');

router.post('/add', UserController.add_user);

module.exports = router;