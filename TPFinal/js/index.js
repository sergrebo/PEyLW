const productos = [
    //Dados
    {
        id: "dado-01",
        titulo: "Dado 01",
        imagen: "./img/productos/dado1.png",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "dado-02",
        titulo: "Dado 02",
        imagen: "./img/productos/dado2.webp",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "dado-03",
        titulo: "Dado 03",
        imagen: "./img/productos/dado3.webp",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "dado-04",
        titulo: "Dado 04",
        imagen: "./img/productos/dado4.webp",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "juego-01",
        titulo: "Colonos de Catan",
        imagen: "./img/productos/juegos_de_mesa/Catan/1.webp",
        categoria: {
            nombre: "Juegos de mesa",
            id: "juegosDeMesa"
        },
        precio: 10000,
    },
    {
        id: "juego-02",
        titulo: "Dune Imperium",
        imagen: "./img/productos/juegos_de_mesa/DuneImperium/1.jpg",
        categoria: {
            nombre: "Juegos de mesa",
            id: "juegosDeMesa"
        },
        precio: 10000,
    },
    {
        id: "juego-03",
        titulo: "Gloomhaven",
        imagen: "./img/productos/juegos_de_mesa/Gloomhaven/1.webp",
        categoria: {
            nombre: "Juegos de mesa",
            id: "juegosDeMesa"
        },
        precio: 10000,
    },
    {
        id: "juego-04",
        titulo: "TEG La Revancha",
        imagen: "./img/productos/juegos_de_mesa/TEG/1.webp",
        categoria: {
            nombre: "Juegos de mesa",
            id: "juegosDeMesa"
        },
        precio: 10000,
    },
]

//DOM
const loginSpan = document.querySelector('#header-login-span')
const botonDesloguear = document.querySelector('#boton-desloguear')
const enlaceALogin = document.querySelector('#enlace-a-login')
const contenerdorProductos = document.querySelector('#contenedor-productos')

//LocalStorage
const usuario = JSON.parse(localStorage.getItem('acceso_exitoso')) || false
const productosEnCarritoLS = JSON.parse(localStorage.getItem('productos-en-carrito'))

//Actualizar el numero de articulos en el carrito
let productosEnCarrito
if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS
    actualizarNumeroProductos()
} else {
    productosEnCarrito = []
}
actualizarNumeroProductos()

//Cargar la información del usuario si esta logueado. En ese caso, se deshabilita el enlace a Login
if (usuario) {
    loginSpan.textContent = `Hola ${usuario.nombreUsuario}`
    botonDesloguear.classList.remove('deshabilitado')
    enlaceALogin.removeAttribute('href')
}

//Cerrar sesión y rehabilitacion del enlace a Login
botonDesloguear.addEventListener('click', () => {
    alert('Gracias por su visita')
    localStorage.removeItem('acceso_exitoso')
    botonDesloguear.classList.add('deshabilitado')
    loginSpan.textContent = 'Login'
    enlaceALogin.setAttribute('href', 'login.html')
})

//FUNCIONES
const productosDestacados = barajarArreglo(productos)
cargarProductos(productosDestacados)


function actualizarNumeroProductos() {
    let nuevoNumeroProductos = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroProductos.innerText = nuevoNumeroProductos
}

function barajarArreglo(arreglo) {
    const arregloMezclado = arreglo.sort(() => Math.random()- 0.5)
    const arregloBarajado = elegirItems(arregloMezclado, 4)
    return arregloBarajado
}

function elegirItems(arreglo, nroItems) {
    return arreglo.slice(0, nroItems)
}

function cargarProductos(seleccionProductos){

    contenerdorProductos.innerHTML = ""

    seleccionProductos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto-item'
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" class="producto-imagen">
                    <div class="producto-detalle">
                        <p class="producto-titulo">${producto.titulo}</p>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
                    </div>
        `
        contenerdorProductos.append(div)
    })
    actualizarBotonesAgregar()
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.boton-agregar') 
    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito)
    })
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {                     //some retorna true si el producto por agregarse en el arreglo productosEnCarrito ya esta en el mismo.
        const indice = productosEnCarrito.findIndex(producto => producto.id === idBoton)    //findIndex retorna el indice dentro de productosEn carrito del producto que estamos agregando pero que ya existe dentro del arreglo.
        productosEnCarrito[indice].cantidad++                                               //aumenta en 1 la propiedad "cantidad" del producto especificado por el indice
    } else {
        productoAgregado.cantidad = 1                                                       //agrega a productoAgregado la propiedad "cantidad" con valor 1, pues es la primera unidad agregada del producto al carrito.
        productosEnCarrito.push(productoAgregado)
    }
    actualizarNumeroProductos()

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
}