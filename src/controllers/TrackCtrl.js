const mongoose = require('mongoose');

require("../models/Track");
const Track = mongoose.model("Track");

const getTracks = (req, res) => {
	const { page = 1, type } = req.query;
	
	let mongoQuery = { userId: req.params.userId };

	if (type) {
		mongoQuery = { '$and': [ 
			{ userId: req.params.userId },
			{ type }
		]}
	}
	
	try {
		Track.paginate(mongoQuery, { 
			page, limit: 10, sort: '_id' 
		}, (err, result) => {
			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao tentar achar seus exercícios!', err });
			}

			return res.status(200).json({ result });
		});
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', err });
	}
}

const createTrack = (req, res) => {

	const { type, locations, userId } = req.body;

	if (!userId) {
		return res.status(500).json({ message: 'Você precisa informar o seu ID!' });		
	}

	if (!type || !locations) {
		return res.status(500).json({ message: 'Você precisa informar o tipo e as coodenadas do exercício!' });		
	}

	try {
		Track.create(req.body, (err) => {
			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao tentar salvar o exercício!', err });
			}

			return res.status(200).json({ message: 'Exercício salvo com sucesso!' });
		});
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', err });
	}	

}

module.exports = { getTracks, createTrack }