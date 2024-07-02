const productosEnCarritoLS = JSON.parse(localStorage.getItem('productos-en-carrito'))
const formularioLogin = document.querySelector('#login-formulario')

formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    const nombreUsuario = document.querySelector('#nombre-usuario')
    const password = document.querySelector('#password')

    const nombreUsuarioValor = nombreUsuario.value
    const passwordValor = password.value

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    console.log(usuarios)

    const usuarioValido = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuarioValor && usuario.password === passwordValor)
    console.log(usuarioValido)

    if (!usuarioValido) {
        alert('Usuario y/o contraseña incorrecto/s')
    } else {
        alert(`Bienvenido ${usuarioValido.nombreUsuario}`)
        localStorage.setItem('acceso_exitoso', JSON.stringify(usuarioValido))
        window.location.href = 'index.html'
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

function actualizarNumeroProductos() {
    let nuevoNumeroProductos = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroProductos.innerText = nuevoNumeroProductos
}