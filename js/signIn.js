document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userManager = new User();

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameByInput = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (usernameByInput.trim() === '' || password.trim() === '') {
            alert('Username dan password harus diisi');
            return;
        }

        const result = userManager.signInUser(usernameByInput, password);

        if (result.success) {
            localStorage.setItem('usernameLoggedIn', usernameByInput);
            window.location.href = '../tasks.html';
        } else {
            alert('Username atau password salah');
            console.log(result.message);
        }
    });
});
