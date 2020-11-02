import { notificationConstant, userConstant } from '../_constants';

export function notificationReducer(state = {}, action) {
	switch (action.type) {
		case notificationConstant.GET_ALL_NOTIFICATION:
			return {
				...state,
				notifications: action.notifications
			};
		
		case userConstant.LOGOUT:
			return {
				state: {}
			};
			
		default:
			return state;
	}
}