document.getElementById('registration-form').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// Пример отправки данных на сервер
	fetch('https://gannitto.github.io/Gannitto_world/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, email, password })
	})
		.then(response => response.json())
		.then(data => {
			document.getElementById('message').innerText = 'Регистрация прошла успешно!';
		})
		.catch(error => {
			document.getElementById('message').innerText = 'Произошла ошибка при регистрации.';
		});
});



import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVxiskY4MROEj3A1Nsy_zJzCr4L0fITWA",
  authDomain: "gannitto-world-7dbe0.firebaseapp.com",
  projectId: "gannitto-world-7dbe0",
  storageBucket: "gannitto-world-7dbe0.appspot.com",
  messagingSenderId: "231799284383",
  appId: "1:231799284383:web:17f6eda6dcc4f6329778aa",
  measurementId: "G-HQ3W9DYEQ8"
};

// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);
const db = firebase.getFirestore(app);

// Получаем форму и сообщение
const registrationForm = document.getElementById('registration-form');
const messageDiv = document.getElementById('message');

// Обработка отправки формы
registrationForm.addEventListener('submit', function (e) {
	e.preventDefault(); // Предотвращаем перезагрузку страницы

	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// Регистрация пользователя с использованием Firebase Authentication
	firebase.createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Получаем зарегистрированного пользователя
			const user = userCredential.user;

			// Сохраняем информацию пользователя в Firestore
			firebase.setDoc(firebase.doc(db, 'users', user.uid), {
				username: username,
				email: email
			}).then(() => {
				messageDiv.textContent = "Регистрация прошла успешно!";
			}).catch((error) => {
				console.error("Ошибка при сохранении данных в Firestore: ", error);
				messageDiv.textContent = "Ошибка при сохранении данных!";
			});
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error("Ошибка при регистрации: ", errorMessage);
			messageDiv.textContent = `Ошибка: ${errorMessage}`;
		});
});
