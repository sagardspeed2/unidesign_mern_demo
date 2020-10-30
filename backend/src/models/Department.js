const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	departmentId: {
        type: mongoose.Schema.Types.ObjectId,
	},
	DepartmentName: {
		type: String,
        required: true,
        trim: true,
        rtrim: true,
        unique: true,
        length: {minimum: 3},
	},
	CreatedAt: {
        type: Date, 
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Department', schema);