const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {

    if (req.method == 'OPTIONS') {
        next();
    } else {

        const token = req.body.token || req.query.token || req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ message: 'Nenhum token foi informado!' });
        }

		try {
			jwt.verify(token, process.env.AUTHENTICATION, (err, decoded) => {
				if (err) {
					return res.status(403).json({ message: 'Falha na autenticação do token!' });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} catch (err) {
			return res.status(400).json({ err });
		}

    }

}