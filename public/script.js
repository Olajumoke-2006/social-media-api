document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // HELPER FUNCTION
    // =========================
    const apiRequest = async (url, data = {}, requireAuth = false, method = 'POST') => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };

            // Always get latest token
            const token = localStorage.getItem('token');

            if (requireAuth && token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method,
                headers,
                body: method !== 'GET' ? JSON.stringify(data) : null
            });

            let result;

            try {
                result = await response.json();
            } catch {
                result = {
                    message: 'Invalid server response'
                };
            }

            return { response, result };

        } catch (error) {
            console.error('API Request Error:', error);

            return {
                response: { ok: false },
                result: { message: 'Network error' }
            };
        }
    };

    // =========================
    // HANDLE LOGIN
    // =========================
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            const { response, result } = await apiRequest(
                '/api/auth/login',
                { email, password }
            );

            if (response.ok) {
                localStorage.setItem('token', result.token);

                alert('Login successful!');
                window.location.href = '/feed';
            } else {
                alert(result.message || 'Login failed.');
            }
        });
    }

    // =========================
    // HANDLE REGISTER
    // =========================
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                username: document.getElementById('username').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value.trim(),

                // Required placeholders
                first_name: 'New',
                last_name: 'User'
            };

            const { response, result } = await apiRequest(
                '/api/auth/signup',
                data
            );

            if (response.ok) {
                localStorage.setItem('token', result.token);

                alert('Registration successful!');
                window.location.href = '/feed';
            } else {
                alert(result.message || 'Registration failed.');
            }
        });
    }

    // =========================
    // HANDLE NEW POST
    // =========================
    const postForm = document.getElementById('postForm');

    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const content = document.getElementById('content').value.trim();

            if (!content) {
                alert('Post content cannot be empty.');
                return;
            }

            const postData = {
                title: content.substring(0, 20),
                content
            };

            const { response, result } = await apiRequest(
                '/api/posts',
                postData,
                true
            );

            if (response.ok) {
                alert('Post created!');
                location.reload();
            } else {
                alert(result.message || 'Failed to create post.');
            }
        });
    }

    // =========================
    // HANDLE FOLLOW
    // =========================
    const followButtons = document.querySelectorAll('.follow-btn');

    followButtons.forEach(button => {
        button.addEventListener('click', async function () {

            const userId = this.dataset.userId;

            if (!userId) {
                alert('User ID missing.');
                return;
            }

            const { response, result } = await apiRequest(
                `/api/users/follow/${userId}`,
                {},
                true,
                'POST'
            );

            if (response.ok) {
                this.textContent = 'Following';
                this.disabled = true;
            } else {
                alert(result.message || 'Could not follow user.');
            }
        });
    });

    // =========================
    // HANDLE LOGOUT
    // =========================
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {

            localStorage.removeItem('token');

            alert('Logged out successfully.');

            window.location.href = '/login';
        });
    }

});