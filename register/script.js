

document.getElementById('main-route-button').addEventListener('click', () => {

    window.location.replace('/HTML-FinalProjet/')


})


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Паролі не збігаються!');
        return;
    }

    if (!email || !username || !password) {
        alert('Будь ласка, заповніть всі поля!');
        return;
    }


    if (localStorage.getItem(username)) {
        alert('Користувач з таким логіном вже існує!');
        return;
    }

    const user = {
        email: email,
        username: username,
        password: password
    };

   
    localStorage.setItem(username, JSON.stringify(user));


    document.getElementById('message').textContent = `Користувача ${username} зареєстровано`;


    document.getElementById('registrationForm').reset();


    window.location.replace('/HTML-FinalProjet/login/');
});

