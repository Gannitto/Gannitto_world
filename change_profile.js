const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const nodemailer = require("nodemailer")
const { isUserLoggedIn } = require("accounts")

const router = express.Router();

// ������� ��� ��������� �������
router.put("/profile/update", async (req, res) => {
	const { userId, newUsername, oldPassword, newPassword, newAvatar } = req.body;

	try {
		const user = await User.findById(userId);

		// ���� ������������ �������� �������� ������, ��������� ������
		if (newPassword && oldPassword) {
			const validPassword = await bcrypt.compare(oldPassword, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: "�������� ������ ������" });
			}

			// �������� ����� ������ � ��������� ���
			const hashedPassword = await bcrypt.hash(newPassword, 12);
			user.password = hashedPassword;

			// ���������� ��������������� ������ �� �����
			await sendPasswordChangeEmail(user.email);
		}

		// ��������� ������ � ��� ������������
		if (newUsername) user.username = newUsername;
		if (newAvatar) user.avatar = newAvatar;

		await user.save();
		res.json({ message: "������� ������� ��������", user });
	} catch (e) {
		res.status(500).json({ message: "������ ��� ���������� �������", e });
	}
});

// �������� ���������������� ������ ��� ��������� ������
async function sendPasswordChangeEmail(email) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "danilaserezhin@gmail.com", // ��� email
			pass: ""   // ��� ������ ���������� TODO
		}
	});

	const mailOptions = {
		from: "danilaserezhin@gmail.com",
		to: email,
		subject: "��������� ������ �� ����� Gannitto World",
		text: "�� �������� ���� ������. ���� ��� ���� �� ��, ����������, ��������� �� ������ ��� ������ ������."
		// ����� ����� �������� ������ ��� ������ ������
	};

	await transporter.sendMail(mailOptions);
}

function displayUserInfo(username) {

	document.getElementById('notLoggedInMessage').style.display = 'none';

	document.getElementById('profile-update-form').style.display = 'flex';
}

// �������� ��������� ����������� ��� �������� ��������
window.onload = function () {
	const username = isUserLoggedIn();
	if (username) {
		displayUserInfo(username);
	}
};

module.exports = router;
