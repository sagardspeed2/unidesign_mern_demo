const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Notification = mongoose.model('Notification');

const UserRepository = require('../repositories/UserRepository');

const config = require('../Config');

/**
 * Create new Notification
 */
exports.add_notification = async (data, req_id, type) => {
    try {
		let notification = new Notification();
		
		notification.notification_from = data.request_by;
		notification.notification_to = data.assign_user;
		notification.notification_to_department = data.department;
		notification.request = req_id;
		notification.message = type === 'New Request' 
			? `raised new request` 
			: type === 'Update Status'
				? `update status of your requst`
				: '';
		type === 'Update Status'
			? notification.notification_type = 'Private'
			: '';

		return await notification.save();
    } catch(error) {
        throw error;
    }
};

/**
 * Get Notification - department, user
 */
exports.get_all_notification = async (department_id, user_id) => {
	try {
		return await Notification.find({
				$or: [
					{notification_to_department: department_id},
					{notification_to: user_id},
					{notification_from: user_id}
				]
			})
			.populate('notification_from', 'userId Username Email department CreatedAt')
			.populate('notification_to', 'userId Username Email department CreatedAt')
			.populate('notification_to_department');
	} catch (error) {
		throw error;
	}
}