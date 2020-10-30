const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const User = mongoose.model('User');
const Department = mongoose.model('Department');

const config = require('../config');

/**
 * Get a user by username
 */
exports.getByUserName = async(username) => {
    return await User.findOne({Username: username});
};

/**
 * Get a user by email
 */
exports.getByEmail = async(email) => {
    return await User.findOne({Email: email});
};

/**
 * Create a user
 */
exports.create = async (data) => {
    try {
        let user = new User();
		
		user.Username = data.username;
        user.Email = data.email;
        user.Password = data.Password;

		return await user.save();
    } catch(error) {
        throw error;
    }
};