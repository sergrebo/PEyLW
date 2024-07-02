


document.addEventListener('DOMContentLoaded', function() {
    // Captura el formulario por su ID
    const formularioContacto = document.querySelector('#formulario-contacto')
    // Agrega un controlador de eventos para el evento 'submit'
    formularioContacto.addEventListener('submit', function(event) {
      // Evita que el formulario se envíe
    event.preventDefault();
    });
});

const botonEnviar = document.querySelector('#boton-enviar-formulario')
botonEnviar.addEventListener('click', validar)

const errorContainer = document.querySelector('#error-container')


//FUNCIONES
function validar() {

    //DOM
    const nombre = document.querySelector('#nombre')
    const tel = document.querySelector('#tel')
    const email = document.querySelector('#email')
    const mensaje = document.querySelector('#mensaje')

    const nombreValor = nombre.value
    const telValor = tel.value
    const emailValor = email.value
    const mensajeValor = mensaje.value

    //VALIDACIONES
    //Nombre
    if (nombreValor){
        correcto(nombre)
    } else {
        error(nombre, 'Nombre es un espacio obligatorio')
    }

    //Telefóno
    if (!telValor){
        error(tel, 'Telefóno es un espacio obligatorio')
    } else if (isNaN(telValor)) {
        error(tel, 'Telefóno debe ser un numero')
    } else if (!valida_entero(telValor)) {
        error(tel, 'Telefóno debe ser un numero entero')
    } else {
        correcto(tel)
    }

    //Email
    if (!emailValor) {
        error(email, 'Email es un espacio obligatorio')
    } else if (!valida_email(emailValor)) {
        error(email, 'Email con formato incorrecto')
    } else {
        correcto(email)
    }

    //Mensaje
    if (mensajeValor){
        correcto(mensaje)
    } else {
        error(mensaje, 'Debe especificar algún mensaje')
    }
}

function error(nodo, mensaje){
    nodo.classList.add('nodo-error')
    let p_error = document.createElement('p')
    p_error.classList.add('parrafo-error')
    p_error.textContent = mensaje
    errorContainer.append(p_error)
}

function correcto(nodo){
    nodo.classList.add('nodo-correcto')
}

function valida_entero(numero){ 
    respuesta = /^[1-9]\d*$/.test(numero)
    return respuesta
}

function valida_email(email){
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
}