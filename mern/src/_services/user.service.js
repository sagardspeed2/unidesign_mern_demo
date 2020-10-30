import axios from 'axios';
import config from '../Config';
import { getToken } from '../_helpers';

export const userService = {
	getUserEmailByToken,
	getUserByEmail,
	registerUser
};

/**
 * Get Email From Token
 */
async function getUserEmailByToken() {
	const url = `${config.apiHost}/user/token`;
	axios.defaults.headers.common['x-access-token'] = getToken();
	const res = await axios.post(url);
	return res.data.Email;
}

/**
 * Get UserDetail From Email
 */
async function getUserByEmail(email) {
	const url = `${config.apiHost}/user/email/${email}`
	axios.defaults.headers.common['x-access-token'] = getToken();
	return await axios.get(url);
}

/**
 * Register new user
 */
async function registerUser (data) {
	const url = `${config.apiHost}/user/add`;
	const body = {
		data
	};
	
	return await axios.post(url, body);
}