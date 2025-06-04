document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = document.querySelectorAll('.input');

    const data = {
        nombre: inputs[0].value,
        apellido: inputs[1].value,
        correo: inputs[2].value,
        confirmacionCorreo: inputs[3].value,
        contraseña: inputs[4].value,
        confirmacionContraseña: inputs[5].value
    };

    console.log("Datos de registro:", JSON.stringify(data));


    // Validación
    if (data.correo !== data.confirmacionCorreo || data.contraseña !== data.confirmacionContraseña) {
        alert("Verifica que el correo y la contraseña coincidan.");
        return;
    }

    // Guardar usuario
    localStorage.setItem('usuario', JSON.stringify({
        nombre: data.nombre,
        correo: data.correo,
        contraseña: data.contraseña
    }));

    alert("Registro exitoso, redirigiendo...");
    window.location.href = "ingresar.html"; // cambia esto a ruta relativa
});