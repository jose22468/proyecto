document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.querySelectorAll('.input')[0].value;
    const correo = document.querySelectorAll('.input')[1].value;
    const contraseña = document.querySelectorAll('.input')[2].value;

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioGuardado) {
        alert("No hay usuarios registrados.");
        return;
    }

    if (correo === usuarioGuardado.correo && contraseña === usuarioGuardado.contraseña) {
        alert("Ingreso exitoso. Bienvenido, " + usuarioGuardado.nombre + "!");
        window.location.href = "sistema.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }

});