// ������� ��� ������ �� ��������
function logout() {
    // �������� ������ ������������ �� localStorage (��� ������ ������� ��������)
    localStorage.removeItem('username');
    
    // ��������������� �� �������� ����� (����� ������� URL �������� ������)
    window.location.href = 'login.html'; // ������� ���������� ���� � �������� �����
}

// ������� ��� �����������, ����������� �� ������������
function isUserLoggedIn() {
    // ������: ���� ��� ������������ ��������� � localStorage
    const username = localStorage.getItem('username');
    return username ? username : null;
}

// ������� ��� ����������� ���������� � ������������
function displayUserInfo(username) {
    // ������ ������ "�����" � "�����������"
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('register-link').style.display = 'none';

    // �������� ���� � ������ ������������ � ��������
    document.getElementById('user-info').style.display = 'flex';

    // ���������� ������ ����� ����� � �������� �������
    document.getElementById('user-avatar').textContent = username.charAt(0).toUpperCase();

    // �������� ��� ������������
    document.getElementById('user-name').textContent = username;
}

// �������� ��������� ����������� ��� �������� ��������
window.onload = function () {
    const username = isUserLoggedIn();
    if (username) {
        displayUserInfo(username);
    }
};
