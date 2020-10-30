import { combineReducers } from 'redux';

import { userReducer } from './user.reducer';
import { loaderReducer } from './loader.reducer';

const rootReducer = combineReducers({
	userReducer,
	loaderReducer
});

export default rootReducer;