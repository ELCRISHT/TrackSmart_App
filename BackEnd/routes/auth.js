const express = require('express');
const router = express.Router();

// Mock user data for demonstration with roles
const users = [
    { email: 'user@example.com', password: 'password123', role: 'student' },
    { email: 'admin@example.com', password: 'adminpass', role: 'admin' }
];

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, user: { email: user.email, role: user.role } });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});

module.exports = router;
