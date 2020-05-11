const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PointSchema = new mongoose.Schema({
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

const TrackSchema = new mongoose.Schema({
	userId: {  type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	time: { type: String },
	type: { type: String, required: true },
	locations: [ PointSchema ]
});

TrackSchema.plugin(mongoosePaginate);

mongoose.model('Track', TrackSchema);
