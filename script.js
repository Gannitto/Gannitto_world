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



const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
