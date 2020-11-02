import { notificationConstant } from '../_constants';
import { notificationService } from '../_services';

import { loaderAction } from './';

export const notificationAction = {
	get_all_notification
};

/**
 * Get All Notification
 */
function get_all_notification (department_id, user_id) {
	return async dispatch => {
		dispatch(loaderOpen());
		await notificationService.get_all_notification(department_id, user_id)
			.then(
				res => {
					dispatch({
						type: notificationConstant.GET_ALL_NOTIFICATION,
						notifications: res.data
					})
				},
				error => {
					console.log(error);
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