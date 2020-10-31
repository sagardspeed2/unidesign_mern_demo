const config = require('../config');

const DepartmentRepository = require('../repositories/DepartmentRepository');

/**
 * Get All Departments
 */
exports.get_all_departments = async (req, res, next) => {
	try {
		const data = await DepartmentRepository.get_all_departments();

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'Departments not found!' });
        }
	} catch (error) {
		res.status(500).send({ message: 'Error on listing the departments!', sysError: error.message });
	}
}

/**
 * Get User from Department
 */
exports.get_user_from_departments = async (req, res, next) => {
	try {
		const data = await DepartmentRepository.get_user_from_departments(req.body.department_id);

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'Users not found in this department!' });
        }
	} catch (error) {
		res.status(500).send({ message: 'Error on listing the users from department!', sysError: error.message });
	}
}