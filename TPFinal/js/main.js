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
        imagen: "./img/productos/juegos_de_mesa/TEG/2.webp",
        categoria: {
            nombre: "Juegos de mesa",
            id: "juegosDeMesa"
        },
        precio: 10000,
    },
]

//DOM
const contenerdorProductos = document.getElementById('contenedor-productos')
//const botonesFiltro = document.getElementsByClassName('boton-filtro')                     getElementsByClassName devuelve una colección de elementos (HTMLCollection), no un arreglo. Para usar forEach, necesitas convertirlo a un arreglo. Otra forma es usar el método querySelectorAll, que devuelve una NodeList que es iterable
const botonesFiltro = document.querySelectorAll('.boton-filtro')
const tituloPrincipal = document.getElementById('titulo-principal')



//Funciones ?
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
}

cargarProductos(productos)


botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {

        if (e.currentTarget.id != "todos") {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosFiltrados)
            productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre
        } else {
            cargarProductos(productos)
            tituloPrincipal.innerText = "Todos los productos"
        }

        

    })
})