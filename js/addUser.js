document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userManager = new User();

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username.trim() === '' || password.trim() === '') {
            alert('Username dan password harus diisi');
            return;
        }

        const userData = {
            username,
            password
        };

        const result = userManager.saveUser(userData);

        if (result.success) {
            alert('User berhasil ditambahkan');
            window.location.href = '../signin.html';
        } else {
            console.log('Proses menyimpan data gagal');
        }
    });
});
