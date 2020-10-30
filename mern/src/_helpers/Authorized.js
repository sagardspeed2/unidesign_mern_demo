import { store } from './store';

export const isAuth = () => {
	if (getToken() && getUser()) {
		return true;
	} else {
		return false;
	}
}

export const getUser = () => {
	const state = store.getState();
	const { user } = state.authentication;
	return user;
};

export const getToken = () => {
	return sessionStorage.getItem('token');
};