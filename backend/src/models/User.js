const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
	Username: {
		type: String,
        required: true,
        trim: true,
        rtrim: true,
        unique: true,
        length: {minimum: 8},
        maxlength: 80
	},
	Email: {
        type: String,
        required: true,
        trim: true,
        rtrim: true,
        unique: true,
        length: {minimum: 8},
        maxlength: 80
    },
    Password: {
        type: String,
        required: true,
        length: {minimum: 8}
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
	},
	CreatedAt: {
        type: Date, 
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('User', schema);