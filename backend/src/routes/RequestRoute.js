const express = require('express');
const router = express.Router();

const RequestController = require('../controllers/RequestController');
const AuthService = require('../services/AuthService');

router.post('/create', AuthService.authorize, RequestController.create_request);

module.exports = router;