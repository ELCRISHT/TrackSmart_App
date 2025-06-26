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
        res.send(JSON.stringify({ success: true, user: { email: user.email, role: user.role } }));
    } else {
        res.send(JSON.stringify({ success: false, message: 'Invalid email or password' }));
    }
});

router.post('/signup', (req, res) => {
    const { name, middleName, lastName, birthday, gender, contactNumber, email, password, role } = req.body;

    if (!name || !lastName || !birthday || !gender || !contactNumber || !email || !password || !role) {
        return res.send(JSON.stringify({ success: false, message: 'Missing required fields' }));
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.send(JSON.stringify({ success: false, message: 'Email already registered' }));
    }

    // Add new user to users array (in real app, save to DB)
    users.push({
        email,
        password,
        role,
        name,
        middleName,
        lastName,
        birthday,
        gender,
        contactNumber
    });

    res.send(JSON.stringify({ success: true, message: 'User registered successfully' }));
});

module.exports = router;
