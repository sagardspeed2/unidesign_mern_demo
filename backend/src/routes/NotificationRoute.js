const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/NotificationController');
const AuthService = require('../services/AuthService');

router.post('/get', AuthService.authorize, NotificationController.get_all_notification);

module.exports = router;