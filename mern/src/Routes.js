import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from './_helpers/CustomRoutes';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const Routes = () => (
	<Switch>
		<PublicRoute exact path='/login' key="login" component={Login} />
		<PublicRoute exact path='/register' key="register" component={Register} />
		
		<PrivateRoute exact path='/dashboard' component={Dashboard} />
		
		<Redirect to="/dashboard" />
	</Switch>
);

export default Routes;