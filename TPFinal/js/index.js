const usuario = JSON.parse(localStorage.getItem('acceso_exitoso')) || false
const loginSpan = document.querySelector('#header-login-span')
const botonDesloguear = document.querySelector('#boton-desloguear')
const enlaceALogin = document.querySelector('#enlace-a-login')
const productosEnCarritoLS = JSON.parse(localStorage.getItem('productos-en-carrito'))

let productosEnCarrito

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS
    actualizarNumeroProductos()
} else {
    productosEnCarrito = []
}
actualizarNumeroProductos()

if (usuario) {
    loginSpan.textContent = `Hola ${usuario.nombreUsuario}`
    botonDesloguear.classList.remove('deshabilitado')
    enlaceALogin.removeAttribute('href')
}

botonDesloguear.addEventListener('click', () => {
    alert('Gracias por su visita')
    localStorage.removeItem('acceso_exitoso')
    botonDesloguear.classList.add('deshabilitado')
    loginSpan.textContent = 'Login'
    enlaceALogin.setAttribute('href', 'login.html')
})



function actualizarNumeroProductos() {
    let nuevoNumeroProductos = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroProductos.innerText = nuevoNumeroProductos
}