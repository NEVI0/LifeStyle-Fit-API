const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("../models/User");
const User = mongoose.model("User");

require('dotenv').config();

const signUp = (req, res) => {

	const { name, email, password, confirmPass } = req.body;

	if (name == '' || name == null) {
		return res.status(500).json({ message: 'O nome precisa ser informado!' });
	}

	if (email == '' || email == null) {
		return res.status(500).json({ message: 'O e-mail precisa ser informado!' });
	}

	if (password == '' || password == null) {
		return res.status(500).json({ message: 'A senha precisa ser informada!' });
	}

	if (password !== confirmPass) {
		return res.status(500).json({ message: 'As senhas não são iguais!' });
	}

	const cryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

	try {

		User.findOne({ email: email }, (err, result) => {

			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao conectar com o Banco de Dados!' });
			}

			if (result) {
				return res.status(500).json({ message: 'Um usuário com este e-mail já existe!' });
			} else {
			
				User.create({
					name, email, password: cryptedPassword
				}, (err, { _id, name, email }) => {

					if (err) {
						return res.status(500).json({ message: 'Ocorreu um error ao tentar criar um usuário!' });
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
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', err });
	}

}

const signIn = (req, res) => {

	const { email, password } = req.body;

	try {
		User.findOne({ email }, (err, result) => {

			if (err) {
				return res.status(500).json({ message: 'Ocorreu um error ao conectar com o Banco de Dados!' });
			}

			if (!result) {
				return res.status(500).json({ message: 'Usuário não encontrado!' });
			}

			if (bcrypt.compareSync(password, result.password)) {

				const { _id, name, email } = result;

				const token = jwt.sign({ _id, name, email }, process.env.AUTHENTICATION, { expiresIn: '1 day' });

				return res.status(200).json({
					user: { _id, name, email },
					token
				});

			} else {
				return res.status(500).json({ message: 'E-mail ou senha inválidos!' });
			}

		});
	} catch (err) {
		return res.status(500).json({ message: 'Ocorreu um error no servidor. Tente novamente mais tarde!', err });
	}
}

const forgotPass = (req, res) => {

}

module.exports = { signUp, signIn, forgotPass }