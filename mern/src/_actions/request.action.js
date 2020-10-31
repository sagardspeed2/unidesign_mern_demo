import { requestConstant } from '../_constants';
import { requestService } from '../_services';
import { alertMessage, history } from '../_helpers';

import { loaderAction } from './';

export const requestAction = {
	create_new_request
};

/**
 * Create New Request
 */
function create_new_request (data) {
	return async dispatch => {
		dispatch(loaderOpen());
		dispatch({
			type: requestConstant.BUTTON_STATUS_DISABLE
		})
		await requestService.create_new_request(data)
			.then(
				res => {
					console.log(res);
					alertMessage('success', 'Request has been added successfully');
					history.push('/pending-request');
				},
				error => {
					dispatch({
						type: requestConstant.BUTTON_STATUS_ENABLE
					})
					alertMessage('error', error.response.data.message);
				}
			)
			.finally (
				() => { dispatch(loaderClose()) }
			);
	}
}

/**
 * Handle Loading
 */
function loaderOpen() { return loaderAction.open() }
function loaderClose() { return loaderAction.close() }