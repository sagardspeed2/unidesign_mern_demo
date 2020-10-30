import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from './_helpers/CustomRoutes';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

const Routes = () => (
	<Switch>
		<PublicRoute exact path='/login' key="login" component={Login} />
		
		<PrivateRoute exact path='/dashboard' component={Dashboard} />
		
		<Redirect to="/dashboard" />
	</Switch>
);

export default Routes;