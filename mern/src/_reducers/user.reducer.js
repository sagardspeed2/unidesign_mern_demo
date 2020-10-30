import { userConstant } from '../_constants';

export function userReducer(state = {}, action) {
	switch (action.type) {
		case userConstant.REFRESH:
			return {
				...state,
				loggedIn: true,
				user: action.user,
				isTried: true
			}
		case userConstant.IS_LOGGING:
			return {
				isloggingIn: action.isLogging
			};
		case userConstant.IS_TRIED:
			return {
				isTried: true
			};
		default:
			return state;
	}
}