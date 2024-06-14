let currentIndex = 0;

document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1);
});

document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1);
});

function navigate(direction) {
    const galleryContainer = document.querySelector('.gallery-container');
    const totalImages = document.querySelectorAll('.gallery-item').length;

    currentIndex = (currentIndex + direction + totalImages) % totalImages;
   const offset = -currentIndex * 100;

    galleryContainer.style.transform = `translateX(${offset}%)`;
}

let autoplayInterval = null;

function startAutoplay(interval) {
    stopAutoplay(); // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    autoplayInterval = setInterval(() => {
        navigate(1); // Navega a la siguiente imagen cada intervalo de tiempo.
    }, interval);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Iniciar autoplay con un intervalo de 3 segundos.
startAutoplay(3000);

// Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
});




const productos = [
    //Dados
    {
        id: "dado-01",
        titulo: "Dado 01",
        imagen: "../img/productos/dado1.png",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "dado-02",
        titulo: "Dado 02",
        imagen: "../img/productos/dado2.webp",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "dado-03",
        titulo: "Dado 03",
        imagen: "../img/productos/dado3.webp",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    },
    {
        id: "dado-04",
        titulo: "Dado 04",
        imagen: "../img/productos/dado4.webp",
        categoria: {
            nombre: "Dados",
            id: "dados"
        },
        precio: 1000,
    }
]


const contenerdorProductos = document