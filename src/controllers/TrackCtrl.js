const mongoose = require('mongoose');

require("../models/Track");
const Track = mongoose.model("Track");

const getTracks = (req, res) => {
	try {
		Track.find({ userId: req.params.userId }, (err, result) => {
			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao tentar achar seus exercícios!' });
			}

			return res.status(200).json({ tracks: result });
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
				return res.status(500).json({ message: 'Ocorreu um error ao tentar salvar o exercício!' });
			}

			return res.status(200).json({ message: 'Exercício salvo com sucesso!' });
		});
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', err });
	}	

}

module.exports = { getTracks, createTrack }