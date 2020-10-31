const md5 = require('md5');

const config = require('../config');

const ValidationContract = require('../_helpes/DataValidator');
const AuthService = require('../services/AuthService');
const UserRepository = require('../repositories/UserRepository');

/**
 * Add new user
 */
exports.add_user = async (req, res, next) => {
	try {
		let body = req.body.data;

		let contract = CreateContractValidation(body);

		let userName = await UserRepository.get_user_by_userName(body.username);
		if (userName) {
			contract.AddError('Username is already in use.');
		}

		let userEmail = await UserRepository.get_user_by_email(body.email);
		if (userEmail) {
			contract.AddError('Email is already in use.');
		}

		if (!contract.IsValid()) {
			res.status(400).send({ errors: contract.errors() }).end();
			return;
		}
		
		body.password = md5(body.password + global.SALT_KEY);
		
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
 * User Sign In
 */
exports.user_signin = async (req, res, next) => {
	try {
		let { email, password } = req.body.data;

		password = md5(password + global.SALT_KEY);

		let user = await UserRepository.user_signin(email, password);
		if (user) {
			let bearerToken = await AuthService.generateToken({
				Email: user.Email,
				Username: user.Username
			});
			
			res.status(200).send({ 
                message: 'Successfully signin', 
                token: bearerToken, 
                user: user
            });
		} else {
			res.status(404).send({ message: "Email or password invalid.", data: req.body.data });
		}
	} catch (error) {
		res.status(500).send({ message: 'Error on login the user.', sysError: error.message });
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
	
	contract.IsRequired(object.department, 'Department is required.');

    return contract;
}

/**
 * Validate Token
 */
exports.validate_token = async (req, res, next) => {
	try {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        let data = await AuthService.decodeToken(token);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Invalid token." });
    }
}

/**
 * Get User Detail By Email
 */
exports.get_user_by_email = async (req, res, next) => {
	try {
        let data = await UserRepository.get_user_by_email(req.params.Email);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error on listing a user by email.', sysError: error.message });
    }
}