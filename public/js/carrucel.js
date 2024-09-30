function setActiveSlide(index) {
    if (typeof index === 'number') {
        // Lógica para cambiar el slide activo
        const carousel = document.querySelector('#carouselExample');
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        carouselInstance.to(index);
    } else {
        console.error('El índice no es un número:', index);
    }
}