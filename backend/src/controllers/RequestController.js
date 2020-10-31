const config = require('../config');

const RequestRepository = require('../repositories/RequestRepository');

/**
 * Create Request
 */
exports.create_request = async (req, res, next) => {
	try {
		if (req.body.message === '') {
			res.status(400).send({ message: 'Please enter the message!' }).end();
			return;
		}

		const data = await RequestRepository.create_request(req.body);
        if (data) {
            res.status(201).send(data);
        } else {
            res.status(404).send({ message: 'Error on saving the Request!' });
        }
	} catch (error) {
		res.status(500).send({ message: 'Error on saving the Request!', sysError: error.message });
	}
}

/**
 * Get Request List
 */
exports.get_request_list = async (req, res, next) => {
	try {
		const data = await RequestRepository.get_request_list(req.body);
        if (data) {
            res.status(201).send(data);
        } else {
            res.status(404).send({ message: 'Error on saving the Request!' });
        }
	} catch (error)  {
		res.status(500).send({ message: 'Error on listing the Requests!', sysError: error.message });
	}
}

/**
 * Set Request Status
 */
exports.set_request_status = async (req, res, next) => {
	try {
		const data = await RequestRepository.set_request_status(req.body);
        if (data) {
            res.status(201).send(data);
        } else {
            res.status(404).send({ message: 'Error on updating the Request status!' });
        }
	} catch (error) {
		res.status(500).send({ message: 'Error on updating the Request status!', sysError: error.message });
	}
}