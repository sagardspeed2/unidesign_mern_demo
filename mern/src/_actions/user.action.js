import { userConstant } from '../_constants';
import { userService } from '../_services';

export const userAction = {
	refreshPage
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