const express = require('express');
const router = express.Router();

const RequestController = require('../controllers/RequestController');
const AuthService = require('../services/AuthService');

router.post('/create', AuthService.authorize, RequestController.create_request);
router.post('/get', AuthService.authorize, RequestController.get_request_list);
router.post('/setStatus', AuthService.authorize, RequestController.set_request_status);

module.exports = router;