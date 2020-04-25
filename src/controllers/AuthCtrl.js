const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("../models/User");
const User = mongoose.model("User");

require('dotenv').config();

const signUp = (req, res) => {

	const { name, email, password, confirmPass } = req.body;

	if (name == '' || name == null) {
		return res.status(500).json({ message: 'O nome precisa ser informado!', status: 500 });
	}

	if (email == '' || email == null) {
		return res.status(500).json({ message: 'O e-mail precisa ser informado!', status: 500 });
	}

	if (password == '' || password == null) {
		return res.status(500).json({ message: 'A senha precisa ser informada!', status: 500 });
	}

	if (password !== confirmPass) {
		return res.status(500).json({ message: 'As senhas não são iguais!', status: 500 });
	}

	const cryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

	try {

		User.findOne({ email: email }, (err, result) => {

			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao conectar com o Banco de Dados!', status: 500 });
			}

			if (result) {
				return res.status(500).json({ message: 'Um usuário com este e-mail já existe!', status: 500 });
			} else {
			
				User.create({
					name, email, password: cryptedPassword
				}, (err, { _id, name, email }) => {

					if (err) {
						return res.status(500).json({ message: 'Ocorreu um error ao tentar criar um usuário!', status: 500 });
					}

					/* Envia um e-mail de boas vindas */

					const token = jwt.sign({ _id, name, email }, process.env.AUTHENTICATION, { expiresIn: '1 day' });

					return res.status(200).json({
						user: { _id, name, email },
						token
					});

				});
			
			}

		});

	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', status: 500 });
	}

}

module.exports = { signUp }