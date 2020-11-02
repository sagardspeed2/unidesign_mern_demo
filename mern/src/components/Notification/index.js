import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

import { notificationAction } from '../../_actions';

import './Notification.scss';

const Notification = (props) => {

	const dispatch = useDispatch();

	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	useEffect(() => {

		moment.updateLocale('en', {
			relativeTime: {
				future: "in %s",
				past:   "%s ago",
				s:  "seconds",
				m:  "1 minute",
				mm: "%d minutes",
				h:  "1 hour",
				hh: "%d hours",
				d:  "1 day",
				dd: "%d days",
				M:  "1 month",
				MM: "%d months",
				y:  "1 year",
				yy: "%d years"
			}
		});

		dispatch(notificationAction.get_all_notification(props.user.department._id, props.user._id));
	}, [])

	return (
		<>
			<div className="notification__container">
				{/* Notification Icon */}
				<ButtonDropdown isOpen={dropdownOpen} group={false} toggle={toggle}>
					<DropdownToggle>
						<FontAwesomeIcon 
							icon={faBell}
							data-toggle="dropdown" 
							aria-haspopup="true" 
							aria-expanded="false" />
					</DropdownToggle>
					<DropdownMenu className="notification__box">
						{/* Notification Content header */}
						<h1>Notification</h1>

						{/* Notifications */}
						<div className="notifications" 
							id="notifications">
							{
								props.notifications &&
								props.notifications
									.map(element => {
										return (
											// Notification Item
											<div className="line" key={element._id}>
												{/* Notification Detail */}
												<div className="noti-content">
													{/* Notification */}
													<div className="noti-text">
														{
															props.user._id === element.notification_from._id
																? `You ${element.message}`
																: `@${element.notification_from.Username} ${element.message}`
														}
													</div>
													{/* Notification Time */}
													<div className="noti-time">
														{moment(element.createdAt).fromNow()}
													</div>
												</div>
											</div>
										)
									})
							}
						</div>
					</DropdownMenu>
				</ButtonDropdown>
			</div>
		</>
	)
}

const mapStatetoProps = state => {
	const { user } = state.userReducer;
	const { notifications } = state.notificationReducer;

	return {
		user,
		notifications
	};
}

const temp = connect(mapStatetoProps)(Notification);

export { temp as Notification };