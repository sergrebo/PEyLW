let indiceActual = 0

document.querySelector('.prev').addEventListener('click', () => {
    navigate(-1)
})

document.querySelector('.sig').addEventListener('click', () => {
    navigate(1)
})

function navigate(direction){
    const carouselInterno = document.querySelector('.carousel-interno')
    const totalItems = document.querySelectorAll('.carousel-item').length

    indiceActual = (indiceActual + direction + totalItems) % totalItems
    const offset = -indiceActual * 100

    carouselInterno.style.transform = `translateX(${offset}%)`
}