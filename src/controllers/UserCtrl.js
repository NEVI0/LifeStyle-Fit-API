const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("../models/User");
const User = mongoose.model("User");

require('dotenv').config();

const users = (req, res) => {
	try {
		User.find((err, result) => {

			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao conectar com o Banco de Dados!', status: 500 });
			}

			return res.status(200).json(result);

		})
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', status: 500 });
	}
}

const updateAccount = (req, res) => {
	try {
		User.findByIdAndUpdate(req.params.id, req.body, { new: true },(err, { _id, name, email }) => {

			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao conectar com o Banco de Dados!', status: 500 });
			}

			const token = jwt.sign({ _id, name, email }, process.env.AUTHENTICATION, { expiresIn: '1 day' });

			return res.status(200).json({
				user: { _id, name, email },
				token
			});

		});
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', status: 500 });
	}
}

const deleteAccount = (req, res) => {
	try {
		User.findByIdAndDelete(req.params.id, err => {

			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao conectar com o Banco de Dados!', status: 500 });
			}

			return res.status(200).json({ message: 'Sua conta foi deletada com sucesso!', status: 200 });

		});
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', status: 500 });
	}
}

module.exports = { users, updateAccount, deleteAccount }