import React from 'react';
import { connect } from 'react-redux';

import { TopNavbar } from '../../components/Navbar';
import { RequestForm } from '../../components/NewRequestForm';

const Dashboard = () => {
	return (
		<>
			<TopNavbar />
			<div>
				<RequestForm />
			</div>
		</>
	)
}

const temp = connect(null)(Dashboard);

export { temp as Dashboard };