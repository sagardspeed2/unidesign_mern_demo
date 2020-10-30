import React, {useEffect} from 'react';
import { Router } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { Loader } from './components/Loader';

import { history } from './_helpers';

import { userAction } from './_actions';

import Routes from './Routes';
import './App.css';

function App() {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userAction.refreshPage());
	});

	return (
		<>
			<Loader />
			<Router history={history}>
				<>
					<Routes />
				</>
			</Router>
		</>
	);
}

export default App;
