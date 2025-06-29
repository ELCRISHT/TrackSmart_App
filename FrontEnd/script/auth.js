document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store user info in localStorage
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('userRole', data.user.role);

            // Redirect to video conferencing page
            window.location.href = '/dashboard.html';
        } else {
            alert(data.message || 'Login failed.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const birthday = document.getElementById('birthday').value;
    const gender = document.getElementById('gender').value;
    const contactNumber = document.getElementById('contactNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;

    if (!name || !lastName || !birthday || !gender || !contactNumber || !email || !password || !confirmPassword || !role) {
        alert('Please fill in all required fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                middleName,
                lastName,
                birthday,
                gender,
                contactNumber,
                email,
                password,
                role
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Signup successful! Please log in.');
            window.location.href = '/index.html';
        } else {
            alert(data.message || 'Signup failed.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup. Please try again.');
    }
});
