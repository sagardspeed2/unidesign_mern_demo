const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/DepartmentController');

router.get('/', DepartmentController.get_all_departments);
router.post('/get-user', DepartmentController.get_user_from_departments);

module.exports = router;