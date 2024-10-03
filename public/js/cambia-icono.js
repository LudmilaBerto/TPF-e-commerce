document.querySelectorAll('.btn-custom').forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        icon.classList.toggle('bi-plus', isExpanded);
        icon.classList.toggle('bi-dash', !isExpanded);
    });
});
document.querySelectorAll('.favoritos').forEach(button => {
    let isFavorite = false;  // Definir isFavorite para cada botón individualmente

    button.addEventListener('click', () => {
        // Encontrar el ícono dentro del botón
        const icon = button.querySelector('i');

        // Alternar el estado de isFavorite
        isFavorite = !isFavorite;

        // Cambiar la clase del ícono basado en el estado de isFavorite
        icon.className = isFavorite ? 'bi bi-heart-fill estilo_i' : 'bi bi-heart estilo_i';
    });
});



