const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
	timestamp: Number,
	coords: {
		latitude: Number,
		longitude: Number,
		altitude: Number,
		accuracy: Number,
		heading: Number,
		speed: Number
	}
});

const trackSchema = new mongoose.Schema({
	userId: {  type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	time: { type: String },
	type: { type: String, required: true },
	locations: [ pointSchema ]
});

mongoose.model('Track', trackSchema);
