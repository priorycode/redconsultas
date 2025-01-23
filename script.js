// JavaScript para manejar el carrusel de imágenes
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showItem(index) {
    items.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
}

function prevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
}

// Inicializar el carrusel mostrando el primer elemento
showItem(currentIndex);

// Agregar funcionalidad a los botones de navegación del carrusel
const nextButton = document.createElement('button');
nextButton.innerText = '➡';
nextButton.className = 'carousel-next';
nextButton.onclick = nextItem;

document.querySelector('.carousel').appendChild(nextButton);

const prevButton = document.createElement('button');
prevButton.innerText = '⬅';
prevButton.className = 'carousel-prev';
prevButton.onclick = prevItem;

document.querySelector('.carousel').appendChild(prevButton);
