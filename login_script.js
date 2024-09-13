document.getElementById('login-form').addEventListener('submit', async function (e) {
	e.preventDefault(); // Предотвращаем перезагрузку страницы

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const response = await fetch('https://gannittoworld-production.up.railway.app/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.statusText}`);
		}

		const data = await response.json();

		if (data.token) {
			// Сохраняем токен в localStorage для дальнейших запросов
			localStorage.setItem('token', data.token);
			alert('Вход выполнен успешно!');
		} else {
			alert('Ошибка входа. Неверные данные.');
		}
	} catch (error) {
		console.error('Ошибка при входе:', error);
		alert(`Ошибка: ${error.message}`);
	}
});
