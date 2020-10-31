const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	requestId: {
        type: mongoose.Schema.Types.ObjectId,
	},
	request_by: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
	},
	assign_to: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
	},
	message: {
        type: String,
        required: true,
        default: ''
	},
	status: {
		type: String,
		enum: ['Approved', 'Pending', 'Rejected'],
		default: 'Pending',
	},
	createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Request', schema);