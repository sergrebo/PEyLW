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
const contenerdorProductos = document.getElementById('contenedor-productos')
//const botonesFiltro = document.getElementsByClassName('boton-filtro')                     
//getElementsByClassName devuelve una colección de elementos (HTMLCollection), no un arreglo. Otra forma es usar el método querySelectorAll, que devuelve una NodeList que es iterable con foreach
const botonesFiltro = document.querySelectorAll('.boton-filtro')
const tituloPrincipal = document.getElementById('titulo-principal')
let botonesAgregar = document.querySelectorAll('.boton-agregar')                            //let y no const porque despues vamos a querer modificar el arreglo. Los botones solo van a existir luego de la ejecucion de cargarProductos()
const numeroProductos = document.querySelector('#numeroProductos')



//FUNCIONES
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

cargarProductos(productos)

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {

        if (e.currentTarget.id != "todos") {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosFiltrados)
            productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            //find retorna el primer elemento que coincida con la condicion especificada dentro
            tituloPrincipal.innerText = productoCategoria.categoria.nombre
        } else {
            cargarProductos(productos)
            tituloPrincipal.innerText = "Todos los productos"
        }
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.boton-agregar') 
    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito)
    })
}

let productosEnCarrito

const productosEnCarritoLS = JSON.parse(localStorage.getItem('productos-en-carrito'))

if (productosEnCarritoLS) {                                                                 //En caso que queramos seguir comprando luego de visitar el carrito, al recargar la tienda debo tener en cuenta el arreglo que ya esta en el localstorage, sino habria incongruencia entre lo que muestra la interfaz y lo que esta en el carrito
    productosEnCarrito = productosEnCarritoLS
    actualizarNumeroProductos()
} else {
    productosEnCarrito = []
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



function actualizarNumeroProductos() {
    let nuevoNumeroProductos = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroProductos.innerText = nuevoNumeroProductos
}