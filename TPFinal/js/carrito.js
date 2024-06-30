const productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'))


const carritoVacio = document.querySelector('#carrito-vacio')
const carritoSection = document.querySelector('#carrito-section')
const carritoLista = document.querySelector('#carrito-lista')
const carritoComprado = document.querySelector('#carrito-comprado')


if (productosEnCarrito) {                                       //Si productosEnCarrito no tiene contenido se evalua false

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
            <svg xmlns="http://www.w3.org/2000/svg" id="${producto.id}" class="producto-quitar icon icon-tabler icon-tabler-trash" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="darkred" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
        `

        carritoLista.append(div)
    })
    

    /*
    <div class="carrito-item carrito-tabla">
                    
                </div>
    */

} else {

}