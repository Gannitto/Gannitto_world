const User = require('./models/User'); // ������ ������������

// ����� ���� ��� �������� ������������� (��������, ��� ��������������)
app.delete('/auth/delete-users', async (req, res) => {
    try {
        // ������� ���� �������������
        await User.deleteMany({}); // �������� ������ ������, ����� ������� ����
        res.status(200).json({ message: '��� ������������ ���� �������' });
    } catch (error) {
        res.status(500).json({ message: '������ ��� �������� �������������', error });
    }
});
