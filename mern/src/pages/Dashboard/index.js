import React from 'react';
import { connect } from 'react-redux';

const Dashboard = () => {
	return (
		<div>
			Dashboard
		</div>
	)
}

const temp = connect(null)(Dashboard);

export { temp as Dashboard };