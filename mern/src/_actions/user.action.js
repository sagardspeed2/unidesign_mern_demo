import { userConstant } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';
import { loaderAction } from './';

export const userAction = {
	refreshPage,
	loginUser,
	registerUser
};

/**
 * Refresh Page - Get User Data
 */
function refreshPage() {
	return async dispatch => {
		try {
			dispatch(setIsLogging(true));
			const Email = await userService.getUserEmailByToken();
			const user = await userService.getUserByEmail(Email);
			dispatch(setIsLogging(false));
			dispatch(refresh(user));
		} catch (error) {
			dispatch(setIsLogging(false));
			dispatch(setIsTried())
			throw (error)
		}
		
	}
}

/**
 * Set User Process status
 */
function setIsLogging(isLogging) {
	return { 
		type: userConstant.IS_LOGGING,
		isLogging
	}
}

/**
 * Set User Data
 */
function refresh(user) { 
	return { type: userConstant.REFRESH, user }; 
}

function setIsTried() {
	return { 
		type: userConstant.IS_TRIED,
	}
}

/**
 * Login User
 */
function loginUser (data) {
	console.log(data);
}

/**
 * Register New User
 */
function registerUser (data) {
	return async dispatch => {
		dispatch(loaderOpen());
		await userService.registerUser(data)
			.then(
				res => {
					history.push('/login');
					console.log(res);
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