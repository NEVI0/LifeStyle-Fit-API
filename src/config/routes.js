const express = require('express');

const AuthCtrl = require('../controllers/AuthCtrl');
const UserCtrl = require('../controllers/UserCtrl');
const TrackCtrl = require('../controllers/TrackCtrl');

const authenticate = require('../config/auth');

module.exports = (server) => {

    const authRoute = express.Router();
	server.use('/auth', authRoute);
	
	const userRoute = express.Router();
	server.use('/user', userRoute);
	userRoute.use(authenticate);
	
	const trackRoute = express.Router();
	server.use('/track', trackRoute);
	trackRoute.use(authenticate);

    authRoute.get('/', (req, res) => {
        return res.status(200).json({ message: `API's Running`, status: 200 });
	});
	
	authRoute.post('/signin', AuthCtrl.signIn);
	authRoute.post('/signup', AuthCtrl.signUp);
	authRoute.post('/validateToken', AuthCtrl.validateToken);
	// authRoute.post('/forgotPass', AuthCtrl.forgotPass);

	userRoute.get('/', UserCtrl.users);
	userRoute.put('/:id', UserCtrl.updateAccount);
	userRoute.delete('/:id', UserCtrl.deleteAccount);

	trackRoute.get('/:userId', TrackCtrl.getTracks);
	trackRoute.post('/', TrackCtrl.createTrack);

}