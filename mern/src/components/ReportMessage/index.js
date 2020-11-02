import React from 'react';
import { connect } from 'react-redux';

import './ReportMessage.scss';

const ReportMessage = (data) => {
	return (
		<>
			<div className="p-3 d-flex">
				<span className="mr-2 font-weight-bold">Message:</span>
				<span style={{flex: 1}}>{data.data.message}</span>
			</div>
		</>
	)
}

const temp = connect(null)(ReportMessage);

export { temp as ReportMessage };