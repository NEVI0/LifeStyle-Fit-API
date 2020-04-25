const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {

    if (req.method == 'OPTIONS') {
        next();
    } else {

        const token = req.body.token || req.query.token || req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ message: 'No token Provided', status: 403 });
        }

		try {
			jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
				if (err) {
					return res.status(403).json({ message: 'Failed to authenticate token', status: 403 });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} catch (err) {
			return res.status(400).json({ err, status: 400 });
		}

    }

}