const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const nodemailer = require("nodemailer")
const { isUserLoggedIn } = require("accounts")

const router = express.Router();

// Маршрут для изменения профиля
router.put("/profile/update", async (req, res) => {
	const { userId, newUsername, oldPassword, newPassword, newAvatar } = req.body;

	try {
		const user = await User.findById(userId);

		// Если пользователь пытается изменить пароль, проверяем старый
		if (newPassword && oldPassword) {
			const validPassword = await bcrypt.compare(oldPassword, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: "Неверный старый пароль" });
			}

			// Хешируем новый пароль и обновляем его
			const hashedPassword = await bcrypt.hash(newPassword, 12);
			user.password = hashedPassword;

			// Отправляем предупреждающее письмо на почту
			await sendPasswordChangeEmail(user.email);
		}

		// Обновляем аватар и имя пользователя
		if (newUsername) user.username = newUsername;
		if (newAvatar) user.avatar = newAvatar;

		await user.save();
		res.json({ message: "Профиль успешно обновлен", user });
	} catch (e) {
		res.status(500).json({ message: "Ошибка при обновлении профиля", e });
	}
});

// Отправка предупреждающего письма при изменении пароля
async function sendPasswordChangeEmail(email) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "danilaserezhin@gmail.com", // Ваш email
			pass: ""   // Ваш пароль приложения TODO
		}
	});

	const mailOptions = {
		from: "danilaserezhin@gmail.com",
		to: email,
		subject: "Изменение пароля на сайте Gannitto World",
		text: "Вы изменили свой пароль. Если это были не вы, пожалуйста, перейдите по ссылке для сброса пароля."
		// Здесь можно добавить ссылку для сброса пароля
	};

	await transporter.sendMail(mailOptions);
}

function displayUserInfo(username) {

	document.getElementById('notLoggedInMessage').style.display = 'none';

	document.getElementById('profile-update-form').style.display = 'flex';
}

// Проверка состояния авторизации при загрузке страницы
window.onload = function () {
	const username = isUserLoggedIn();
	if (username) {
		displayUserInfo(username);
	}
};

module.exports = router;
