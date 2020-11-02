const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	notificationId: {
        type: mongoose.Schema.Types.ObjectId,
	},
	notification_from: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
	},
	message: {
        type: String,
        required: true,
        default: ''
	},
	status: {
		type: String,
		enum: ['Read', 'Not Read'],
		default: 'Not Read',
	},
	createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Notification', schema);