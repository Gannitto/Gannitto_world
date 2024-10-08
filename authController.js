const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const { secret } = require("./config")

const generateAcessToken = (id, roles) => {
	const payload = { id, roles }
	return jwt.sign(payload, secret, {expiresIn: "1h"})
}

class authController {

	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({message: "Registration error: ", errors})
			}
			const { username, password, email } = req.body
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res.status(400).json({message: "There was alreary a user with that name"})
			}
			const hashPassword = bcrypt.hashSync(password, 7)
			const userRole = await Role.findOne({ value: "USER" })
			const user = new User({ username, password: hashPassword, email: email, roles: [userRole.value] })
			await user.save()
			return res.json({message: "User was sucsessly registred"})
		} catch (e) {
			console.log(e)
			res.status(400).json({message: `Registration error   ${e}`})
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })
			if (!user) {
				return res.status(400).json({message: `User ${username} don't found'`})
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return rec.status(400).json({message: "Password is incorrect"})
			}
			const token = generateAcessToken(user._id, user.roles)
			return res.json({token})
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: `Login error   ${e}`})
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (e) {
			console.log(e)
		}
	}

}

module.exports = new authController()