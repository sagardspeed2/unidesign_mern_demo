const config = require('../Config');

const NotificationRepository = require('../repositories/NotificationRepository');

/**
 * Get All Notification - department, user
 */
exports.get_all_notification = async (req, res, next) => {
	try {
		const data = await NotificationRepository.get_all_notification(req.body.department_id, req.body.user_id);

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'Notification not found!' });
        }
	} catch (error) {
		res.status(500).send({ message: 'Error on listing the notification!', sysError: error.message });
	}
}