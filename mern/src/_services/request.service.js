import axios from 'axios';

import config from '../Config';
import { getToken } from '../_helpers';

export const requestService = {
	create_new_request,
};

/**
 * Create new request
 */
async function create_new_request (data) {
	const url = `${config.apiHost}/request/create`;
	axios.defaults.headers.common['x-access-token'] = getToken()
	
	return await axios.post(url, data);
}