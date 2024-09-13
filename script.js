//document.getElementById('registration-form').addEventListener('submit', function (event) {
//	event.preventDefault();

//	const username = document.getElementById('username').value;
//	const email = document.getElementById('email').value;
//	const password = document.getElementById('password').value;

//	// Пример отправки данных на сервер
//	fetch('https://gannitto.github.io/Gannitto_world/registration', {
//		method: 'POST',
//		headers: {
//			'Content-Type': 'application/json'
//		},
//		body: JSON.stringify({ username, email, password })
//	})
//		.then(response => response.json())
//		.then(data => {
//			document.getElementById('message').innerText = 'Регистрация прошла успешно!';
//		})
//		.catch(error => {
//			document.getElementById('message').innerText = 'Произошла ошибка при регистрации.';
//		});
//});
var messageDiv = document.getElementById('message')
document.getElementById('registration-form').addEventListener('submit', async function (e) {
	e.preventDefault(); // Предотвращаем перезагрузку страницы


	const username = document.getElementById('username').value
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value

	try {
		const response = await fetch('https://gannittoworld-production.up.railway.app/auth/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password
			})
		});

		if (!response.ok) {
			messageDiv.textContent = `Ошибка: ${response.statusText}`
			throw new Error(`Ошибка: ${response.statusText}`);
		}

		const data = await response.json();
		alert('Регистрация прошла успешно!');
		console.log('Ответ сервера:', data);
		messageDiv.textContent = "Регистрация прошла успешно!"

	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		messageDiv.textContent = `${errorMessage}   Код: ${errorCode}`
		console.error("Ошибка при регистрации: ", errorMessage)
	}
})
