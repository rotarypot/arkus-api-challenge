const jwt = require('jsonwebtoken');

function authCheck(req, res, next) {

    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied.');

    try {
        const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = isVerified;
        next();

    } catch (err) {
        res.status(400).send('Invalid Token.')
    }
}