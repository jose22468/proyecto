document.addEventListener('DOMContentLoaded', function() {
    // Manejo del formulario de registro
    const registrationForm = document.querySelector('.form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validación básica
            if (!name || !email || !password) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Crear objeto de usuario
            const user = {
                nombre: name,
                correo: email,
                contraseña: password, // En una aplicación real, NUNCA almacenes contraseñas en texto plano
                fechaRegistro: new Date().toISOString()
            };
            
            // Guardar usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Guardar en lista de usuarios (para el sistema de login)
            let users = JSON.parse(localStorage.getItem('users') || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Registro exitoso. Serás redirigido a la página de inicio.');
            window.location.href = 'ingresar.html';
        });
    }
    
    // Manejo del enlace "Iniciar sesión"
    const signinLink = document.querySelector('.signin-link');
    if (signinLink) {
        signinLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'ingresar.html';
        });
    }
});
