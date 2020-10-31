global.SALT_KEY = 'sJTpWGMQLKpwrz4R2ukFW6825_Yd5';
require('dotenv').config();

const dev = {
    dbConnectionString: 'mongodb+srv://sagardspeed2:Admin@123@cluster0.0kh3l.mongodb.net/mern?retryWrites=true&w=majority',
};

const config = {
    dev
};

module.exports = config['dev'];