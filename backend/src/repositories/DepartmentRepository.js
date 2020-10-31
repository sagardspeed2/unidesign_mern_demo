const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Department = mongoose.model('Department');
const User = mongoose.model('User');

const config = require('../config');

/**
 * Get all departments
 */
exports.get_all_departments = async() => {
	try {
		return await Department.find();
	} catch (error) {
		throw error;
	}
};

/**
 * Get users from departments
 */
exports.get_user_from_departments = async(department_id) => {
	try {
		return await User.find({department: department_id}, 'userId Username Email department CreatedAt')
			.populate('department');
	} catch (error) {
		throw error;
	}
}