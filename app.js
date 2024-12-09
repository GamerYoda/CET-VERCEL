const menu = document.querySelector('#mobile-menu');
const menuLinks =document.querySelector('.navbar__menu');

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = this[0].value;
    const password = this[1].value;

    fetch('/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'login', email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            window.location.href = '/'; // Redirect to home
        } else {
            alert('Login failed: ' + data.message);
        }
    });
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = this[0].value;
    const email = this[1].value;
    const password = this[2].value;

    fetch('/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'signup', username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Signup successful! You can now log in.');
        } else {
            alert('Signup failed: ' + data.message);
        }
    });
});

