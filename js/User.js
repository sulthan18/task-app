class User {
    constructor() {
        this.users = this.getUsers() || [];
    }

    saveUser(userData) {
        const { username, password } = userData;

        if (!username || !password) {
            return {
                success: false,
                message: 'Username dan password harus diisi'
            };
        }

        const newUser = {
            id: Date.now(),
            username,
            password
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));

        return {
            success: true
        };
    }

    signInUser(usernameByInput, password) {
        const user = this.users.find(user => user.username.toLowerCase() === usernameByInput.toLowerCase());

        if (user && user.password === password) {
            return {
                success: true,
                user
            };
        } else {
            return {
                success: false,
                message: 'Username atau password salah'
            };
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
}
