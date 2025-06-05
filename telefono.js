document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registerForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validación básica
            if (!name || !email || !password || !confirmPassword) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Crear objeto de usuario
            const user = {
                nombre: name,
                correo: email,
                contraseña: password,
                fechaRegistro: new Date().toISOString()
            };
            
            // Guardar usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(user));
            
            // Mostrar mensaje y redirigir
            alert('Registro exitoso. Serás redirigido a la página de ingreso.');
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
