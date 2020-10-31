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

/**
 * Get Request List
 */
exports.get_request_list = async (body) => {
	try {
		let tempObj = {};

		if (body.from === 'user') {
			tempObj = {
				request_by: body._id,
				status: body.request_status
			}
		}

		if (body.from === 'department') {
			tempObj = {
				department: body._id,
				status: body.request_status
			}
		}

		return await Request.find(tempObj)
			.populate('request_by', 'userId Username Email department CreatedAt')
			.populate('assign_to', 'userId Username Email department CreatedAt')
			.populate('department');
	} catch (error) {
		throw error;
	}
}

/**
 * Set Request Status
 */
exports.set_request_status = async (body) => {
	try {
		await Request.findOneAndUpdate({_id: body._id }, {
            $set: {
                status: body.status
            }
		});
		
		return await Request.findOne({_id: body._id})
			.populate('request_by', 'userId Username Email department CreatedAt')
			.populate('assign_to', 'userId Username Email department CreatedAt')
			.populate('department');
	} catch (error) {
		throw error;
	}
}