const express = require('express');
const router = express.Router();

// Mock user data for demonstration
const users = [
    { email: 'user@example.com', password: 'password123' }
];

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});

module.exports = router;
