import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Card, CardTitle,
	Form, FormGroup, Label, Input,
	Button
} from 'reactstrap';

import './Login.scss';

const Login = () => {
	return (
		<>
			<ReactCSSTransitionGroup
				component="div"
				transitionName="TabsAnimation"
				transitionAppear={true}
				transitionAppearTimeout={0}
				transitionEnter={false}
				transitionLeave={false}>
				<div className="w-25 login__page formBox">
					<Card className="main-card mb-3">
						<CardTitle className="mb-3">Login</CardTitle>
						<Form>
							<FormGroup>
								<Label for="exampleEmail">Email</Label>
								<Input 
									type="email" 
									name="Email" 
									id="exampleEmail"
									placeholder="Enter your email"
									required />
							</FormGroup>
							<FormGroup>
								<Label for="examplePassword">Password</Label>
								<Input 
									type="password" 
									name="Password" 
									id="examplePassword"
									placeholder="Enter your password" 
									required />
							</FormGroup>
							<Button 
								type="button" 
								color="primary" 
								className="mt-1">
								Login
							</Button>
						</Form>
					</Card>
				</div>
			</ReactCSSTransitionGroup>
		</>
	)
}

const temp = connect(null)(Login);

export { temp as Login };
