import { combineReducers } from 'redux';

import { loaderReducer } from './loader.reducer';
import { userReducer } from './user.reducer';
import { departmentReducer } from './department.reducer';
import { requestReducer } from './request.reducer';
import { notificationReducer } from './notification.reducer';

const rootReducer = combineReducers({
	loaderReducer,
	userReducer,
	departmentReducer,
	requestReducer,
	notificationReducer
});

export default rootReducer;