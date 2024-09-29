import { Router } from "express"
import { compare, hash } from "bcryptjs"
import { findById } from "./models/User"
import { createTransport } from "nodemailer"
import { isUserLoggedIn } from "accounts"

const router = Router();

// ������� ��� ��������� �������
router.put("/profile/update", async (req, res) => {
	const { userId, newUsername, oldPassword, newPassword, newAvatar } = req.body;

	try {
		const user = await findById(userId);

		// ���� ������������ �������� �������� ������, ��������� ������
		if (newPassword && oldPassword) {
			const validPassword = await compare(oldPassword, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: "�������� ������ ������" });
			}

			// �������� ����� ������ � ��������� ���
			const hashedPassword = await hash(newPassword, 12);
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
	const transporter = createTransport({
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

// �������� ��������� ����������� ��� �������� ��������
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
