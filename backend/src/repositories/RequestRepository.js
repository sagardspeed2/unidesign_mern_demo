const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Request = mongoose.model('Request');

const config = require('../config');

/**
 * Create new request
 */
exports.create_request = async (data) => {
    try {
        let request = new Request();
		
		request.request_by = data.request_by;
        request.assign_to = data.assign_user;
		request.department = data.department;
		request.message = data.message;

		return await request.save();
    } catch(error) {
        throw error;
    }
};