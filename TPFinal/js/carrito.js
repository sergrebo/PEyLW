//LocalStorage
let productosEnCarrito = localStorage.getItem('productos-en-carrito')
productosEnCarrito = JSON.parse(productosEnCarrito)


const usuario = JSON.parse(localStorage.getItem('acceso_exitoso')) || false



//DOM
const carritoVacio = document.querySelector('#carrito-vacio')
const carritoSection = document.querySelector('#carrito-section')
const carritoLista = document.querySelector('#carrito-lista')
const carritoComprado = document.querySelector('#carrito-comprado')
let botonesEliminar = document.querySelectorAll('.producto-eliminar')       //let pues los botones se crean a traves del presente documento mas adelante, por lo que debo poder modificar el contenido de esta variable
const botonVaciar = document.querySelector('#boton-vaciar')
const total = document.querySelector('#total')
const botonComprar = document.querySelector('#boton-comprar')

const loginSpan = document.querySelector('#header-login-span')
const botonDesloguear = document.querySelector('#boton-desloguear')
const enlaceALogin = document.querySelector('#enlace-a-login')

//FUNCIONES
function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        //Si productosEnCarrito no tiene contenido se evalua false. Si eliminamos todos los productos en el carrito, productosEnCarrito queda como un arreglo sin elementos, entonces, para mostrar que esta vacio, agregamos la propiedad length

        carritoVacio.classList.add('deshabilitado')                 //classList.add agrega una clase al objeto seleccionado
        carritoSection.classList.remove('deshabilitado')            //classList.remove, en cambio, la elimina
        carritoComprado.classList.add('deshabilitado')

        carritoLista.innerHTML = `
            <div class="lista-atributos carrito-tabla">
                <p class="producto-img">Producto</p>
                <p class="producto-titulo">Detalle</p>
                <p class="producto-precio-carrito">Precio</p>
                <p class="producto-cantidad">Cantidad</p>
                <p class="producto-subtotal">Subtotal</p>
                <p class="producto-quitar">Quitar</p>
            </div>
        `

        productosEnCarrito.forEach(producto => {
            const div = document.createElement('div')
            div.classList.add('carrito-item', 'carrito-tabla')
            div.innerHTML = `
                <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <p class="producto-titulo">${producto.titulo}</p>
                <p class="producto-precio-carrito">$${producto.precio}</p>
                <p class="producto-cantidad">${producto.cantidad}</p>
                <p class="producto-subtotal">$${producto.precio * producto.cantidad}</p>
                <button id="${producto.id}" class="producto-eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="darkred" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
                
            `
            carritoLista.append(div)
        })
        

    } else {
        carritoVacio.classList.remove('deshabilitado')
        carritoSection.classList.add('deshabilitado')
        carritoComprado.classList.add('deshabilitado')
    }

    actualizarBotonesEliminar()
    actualizarTotal()

}

cargarProductosCarrito()

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.producto-eliminar')
    botonesEliminar.forEach(boton =>{
        boton.addEventListener('click', eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    
    const indice = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    productosEnCarrito.splice(indice, 1)                //splice modifica elementos de un arreglo. En nuestro caso, en el indice, elimina el elemento
    
    cargarProductosCarrito()                            //actualizado el arreglo, reimprime su contenido en la pagina del carrito

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
    //si actualizo la pagina del carrito sin modificar la informacion cargada en el LocalStorage el carrito volvera a esa situacion, por lo que debo hacer el strigify con la nueva informacion
}

botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito(e){
    productosEnCarrito.length = 0
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}

function actualizarTotal(){
    const calculoPrecio = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${calculoPrecio}`
}

botonComprar.addEventListener('click', comprarCarrito)

function comprarCarrito(){
    if(usuario){
        productosEnCarrito.length = 0
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
        cargarProductosCarrito()

        carritoVacio.classList.add('deshabilitado')
        carritoSection.classList.add('deshabilitado')
        carritoComprado.classList.remove('deshabilitado')
    } else {
        alert('Para finalizar la compra debe iniciar sesión')
        open('./login.html')
        close()
    }
    
}


function cargarUsuario(usuario){
    //Cargar la información del usuario si esta logueado. En ese caso, se deshabilita el enlace a Login
    if (usuario) {
        loginSpan.textContent = `Hola ${usuario.nombreUsuario}`
        botonDesloguear.classList.remove('deshabilitado')
        enlaceALogin.removeAttribute('href')
    }
}

cargarUsuario(usuario)

//Cerrar sesión y rehabilitacion del enlace a Login
botonDesloguear.addEventListener('click', () => {
    alert('Gracias por su visita')
    localStorage.removeItem('acceso_exitoso')
    botonDesloguear.classList.add('deshabilitado')
    loginSpan.textContent = 'Login'
    enlaceALogin.setAttribute('href', 'login.html')
    open('./carrito.html')
    close()
})