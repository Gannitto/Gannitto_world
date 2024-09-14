// Функция для выхода из аккаунта
function logout() {
    // Удаление данных пользователя из localStorage (или другой системы хранения)
    localStorage.removeItem('username');
    
    // Перенаправление на страницу входа (можно указать URL страницы логина)
    window.location.href = 'login.html'; // Укажите правильный путь к странице входа
}

// Функция для определения, авторизован ли пользователь
function isUserLoggedIn() {
    // Пример: если имя пользователя сохранено в localStorage
    const username = localStorage.getItem('username');
    return username ? username : null;
}

// Функция для отображения информации о пользователе
function displayUserInfo(username) {
    // Скрыть ссылки "Войти" и "Регистрация"
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('register-link').style.display = 'none';

    // Показать блок с именем пользователя и аватаром
    document.getElementById('user-info').style.display = 'flex';

    // Установить первую букву имени в качестве аватара
    document.getElementById('user-avatar').textContent = username.charAt(0).toUpperCase();

    // Показать имя пользователя
    document.getElementById('user-name').textContent = username;
}

// Проверка состояния авторизации при загрузке страницы
window.onload = function () {
    const username = isUserLoggedIn();
    if (username) {
        displayUserInfo(username);
    }
};
