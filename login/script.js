document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem(username));

    if (!user) {
        alert('Користувача з таким логіном не знайдено!');
        return;
    }


    if (user.password === password) {
        alert('Вхід успішний!');

     
        localStorage.setItem('currentUser', JSON.stringify(user));

       
        window.location.replace('/HTML-FinalProjet/');
    } else {
        alert('Неправильний логін або пароль!');
    }
});