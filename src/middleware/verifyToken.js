const createError = require('http-errors')
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    try {
        const authHeader = req.headers.Authorization || req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createError(401, 'Token not found!');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw createError(401, 'Token not found!');
        }

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        if (!decoded) {
            throw createError(401, 'Invalid Token!');
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.error({ statusCode: error.status, error: error.message, data: error.data })
    }
};

module.exports = verifyToken;