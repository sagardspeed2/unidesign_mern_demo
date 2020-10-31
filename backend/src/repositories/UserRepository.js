const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const User = mongoose.model('User');
const Department = mongoose.model('Department');

const config = require('../config');

/**
 * Get a user by username
 */
exports.get_user_by_userName = async(username) => {
    return await User.findOne({Username: username});
};

/**
 * Get a user by email
 */
exports.get_user_by_email = async(email) => {
	return await User.findOne({Email: email}, 'userId Username Email department CreatedAt')
		.populate('department');
};

/**
 * Create a user
 */
exports.create = async (data) => {
    try {
        let user = new User();
		
		user.Username = data.username;
        user.Email = data.email;
		user.Password = data.password;
		user.department = data.department;

		return await user.save();
    } catch(error) {
        throw error;
    }
};

/**
 * Sign in User
 */
exports.user_signin = async (email, password) => {
	try {
		let res = await User.findOne({
			Email: email, Password: password
		}, 'userId Username Email department CreatedAt')
		.populate('department');
		
		return res;
	} catch (error) {
		throw error;
	}
}