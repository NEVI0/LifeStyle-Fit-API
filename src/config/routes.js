const express = require('express');

const AuthCtrl = require('../controllers/AuthCtrl');
const UserCtrl = require('../controllers/UserCtrl');

module.exports = (server) => {

    const authRoute = express.Router();
	server.use('/auth', authRoute);
	
	const userRoute = express.Router();
    server.use('/user', userRoute);

    // const api = express.Router();
    // server.use("/api", api);
    // api.use(auth);

    authRoute.get('/', (req, res) => {
        return res.status(200).json({ message: `API's Running`, status: 200 });
	});
	
	authRoute.post('/signup', AuthCtrl.signUp);

	userRoute.get('/', UserCtrl.users);
	userRoute.put('/:id', UserCtrl.updateAccount);
	userRoute.delete('/:id', UserCtrl.deleteAccount);

}