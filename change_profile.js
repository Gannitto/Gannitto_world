import { Router } from "express"
import { compare, hash } from "bcryptjs"
import { findById } from "./models/User"
import { createTransport } from "nodemailer"
import { isUserLoggedIn } from "accounts"

const router = Router();

// Маршрут для изменения профиля
router.put("/profile/update", async (req, res) => {
	const { userId, newUsername, oldPassword, newPassword, newAvatar } = req.body;

	try {
		const user = await findById(userId);

		// Если пользователь пытается изменить пароль, проверяем старый
		if (newPassword && oldPassword) {
			const validPassword = await compare(oldPassword, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: "Неверный старый пароль" });
			}

			// Хешируем новый пароль и обновляем его
			const hashedPassword = await hash(newPassword, 12);
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
	const transporter = createTransport({
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

// Проверка состояния авторизации при загрузке страницы
window.onload = function () {
	const username = isUserLoggedIn();
	if (username) {
		document.getElementById('notLoggedInMessage').style.display = 'none';
		document.getElementById('profile-update-form').style.display = 'flex';
		console.log(12)
	}
	else {
		document.getElementById('notLoggedInMessage').style.display = 'flex';
		document.getElementById('profile-update-form').style.display = 'none';
		console.log(34)
	}
};

export default router;
