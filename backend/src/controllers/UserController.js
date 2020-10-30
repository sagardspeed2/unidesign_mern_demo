const md5 = require('md5');

const config = require('../config');

const ValidationContract = require('../_helpes/DataValidator');

const UserRepository = require('../repositories/UserRepository');

/**
 * Add new user
 */
exports.add_user = async (req, res, next) => {
	try {
		let body = req.body.data;

		let contract = CreateContractValidation(body);

		let userName = await UserRepository.getByUserName(body.username);
		if (userName) {
			contract.AddError('Username is already in use.');
		}

		let userEmail = await UserRepository.getByEmail(body.email);
		if (userEmail) {
			contract.AddError('Email is already in use.');
		}

		if (!contract.IsValid()) {
			res.status(400).send({ errors: contract.errors(), user: userEmail }).end();
			return;
		}

		body.Password = md5(req.body.Password + global.SALT_KEY);
		
		// saving the user
		const user = await UserRepository.create(body);
		
		if (user) {
			res.status(201).send({ message: 'User created.', id: user._id });
		} else {
			res.status(400).send({ message: 'Error on saving the user.' });
		}
	} catch (error) {
		res.status(500).send({ message: 'Error on saving the user.', sysError: error.message });
	}
}

/**
 * Validate a user object 
 */
const CreateContractValidation = (object) => {
	let contract = new ValidationContract();
	
	contract.IsRequired(object.username, 'Username is required.');
    contract.IsUsername(object.username, 'Username is invalid.');
    contract.HasMinLength(object.username, 8, 'Username must have at minimum 8 characters.');
    contract.HasMaxLength(object.username, 50, 'Username must have at maximum 50 characters.');

    contract.IsRequired(object.email, 'Email is required.');
    contract.IsEmail(object.email, 'Email is invalid.');
    contract.HasMinLength(object.email, 8, 'Email must have at minimum 8 characters.');
    contract.HasMaxLength(object.email, 80, 'Email must have at maximum 80 characters.');

    contract.IsRequired(object.password, 'Password is required.');
    contract.IsPassword(object.password, 'Password must consist of plain letters and numbers, no special characters. It must have at least one uppercase character, one lowercase character and one number.');
    contract.HasMinLength(object.password, 8, 'Password must have at minimum 8 characters.');

    return contract;
}