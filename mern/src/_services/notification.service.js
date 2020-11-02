import axios from 'axios';

import config from '../Config';
import { getToken } from '../_helpers';

export const notificationService = {
	get_all_notification
};

/**
 * Create new request
 */
async function get_all_notification (department_id, user_id) {
	const url = `${config.apiHost}/notification/get`;
	const body = {
		department_id,
		user_id
	};
	
	axios.defaults.headers.common['x-access-token'] = getToken();
	
	return await axios.post(url, body);
}