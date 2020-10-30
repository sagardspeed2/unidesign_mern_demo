import axios from 'axios';
import config from '../Config';
import { getToken } from '../_helpers';

export const userService = {
	getUserEmailByToken,
	getUserByEmail
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
	const res = await axios.get(url);
	return res.data;
}