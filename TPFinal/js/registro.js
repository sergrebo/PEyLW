const productosEnCarritoLS = JSON.parse(localStorage.getItem('productos-en-carrito'))
const errorContainerRegistro = document.querySelector('#error-container-registro')
const formularioLogin = document.querySelector('#login-formulario')

formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault()

    //DOM
    const nombreUsuario = document.querySelector('#nombre-usuario')
    const email = document.querySelector('#email-registro')
    const password = document.querySelector('#password')

    const nombreUsuarioValor = nombreUsuario.value
    const emailValor = email.value
    const passwordValor = password.value

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const idUsuarioRegistrado = usuarios.find(usuario => usuario.email === emailValor)

    //Validación de campos
    const usuarioOk = validarUsuario(nombreUsuario)
    const emailOk = validarEmail(email)
    const passwordOk = validarPassword(password)
    console.log(usuarioOk)
    console.log(emailOk)
    console.log(passwordOk)

    //No repetición de usuarios según email y incorporación al LocalStorage
    if (usuarioOk && emailOk && passwordOk) {
        if (idUsuarioRegistrado) {
            alert('El usuario ya se encuentra registrado con ese email')
        } else {
            usuarios.push({nombreUsuario: nombreUsuarioValor, email: emailValor, password: passwordValor})
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            alert('Registro exitoso')
            window.location.href = 'login.html'
        }
    } else {
        errorContainerRegistro.classList.remove('deshabilitado')
    }


})

let productosEnCarrito

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS
    actualizarNumeroProductos()
} else {
    productosEnCarrito = []
}
actualizarNumeroProductos()

//FUNCIONES
function validarUsuario (usuario) {
    let respuesta = false
    if (usuario.value){
        correcto(usuario)
        respuesta = true
    } else {
        error(usuario, 'Usuario es un espacio obligatorio')
    }
    return respuesta
}

function validarEmail (email) {
    let respuesta = false
    if (!email.value) {
        error(email, 'Email es un espacio obligatorio')
    } else if (!valida_email(email.value)) {
        error(email, 'Email con formato incorrecto')
    } else {
        correcto(email)
        respuesta = true
    }
    return respuesta
}

function validarPassword (password) {
    let respuesta = false
    if (password.value){
        correcto(password)
        respuesta = true
    } else {
        error(password, 'Contraseña es un espacio obligatorio')
    }
    return respuesta
}

function error(nodo, mensaje){
    nodo.classList.add('nodo-error')
    let p_error = document.createElement('p')
    p_error.classList.add('parrafo-error')
    p_error.textContent = mensaje
    errorContainerRegistro.append(p_error)
}

function correcto(nodo){
    nodo.classList.add('nodo-correcto')
}

function valida_email(email){
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
}

function actualizarNumeroProductos() {
    let nuevoNumeroProductos = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroProductos.innerText = nuevoNumeroProductos
}