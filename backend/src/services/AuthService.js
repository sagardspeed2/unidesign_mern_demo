const jwt = require('jsonwebtoken');

const generateToken = async (data) => {
    try {
        return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
    } catch(error) {
        throw error;
    }
}

exports.decodeToken = async (token) => {
    try {
        var data = await jwt.verify(token, global.SALT_KEY);
        return data
    } catch (error) {
        throw error
    }
}

exports.generateToken = generateToken;

exports.generateUserToken = async (
    email = '', firstName = '', lastName = ''
) => {
    try {
        return await generateToken({
            Email: email,
            FirstName: firstName,
            LastName: lastName
        });
    } catch (error) {
        throw error;
    }
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Access Denied'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next();
            }
        });
    }
};

exports.authorizeV2 = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Access Denied'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                req.body.user = decoded;
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Invalid Token'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Access denied. Only for admins.'
                    });
                }
            }
        });
    }
};