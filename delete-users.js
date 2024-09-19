const User = require('./models/User'); // Модель пользователя

// Новый роут для удаления пользователей (например, для администратора)
app.delete('/auth/delete-users', async (req, res) => {
    try {
        // Удаляем всех пользователей
        await User.deleteMany({}); // Оставьте фильтр пустым, чтобы удалить всех
        res.status(200).json({ message: 'Все пользователи были удалены' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пользователей', error });
    }
});
