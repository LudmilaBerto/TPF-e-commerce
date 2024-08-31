document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el elemento que se mostrará/ocultará
    let searchBox = document.getElementById('search-box');
    // Selecciona el botón que mostrará/ocultará el searchBox
    let toggleButton = document.getElementById('oculta-muestra-buscador');
    // Selecciona el campo de búsqueda
    let inputBuscar = document.getElementById('inputBuscar');
    // Selecciona el botón de limpieza
    let limpiarBuscador = document.getElementById('limpiar-buscador');

    // Inicialmente oculta el searchBox y muestra el botón
    searchBox.style.display = 'none';
    toggleButton.style.display = 'block';

    // Añade un evento de clic al botón para mostrar/ocultar el searchBox
    toggleButton.addEventListener('click', () => {
        if (searchBox.style.display === 'none' || searchBox.style.display === '') {
            searchBox.style.display = 'block'; // Muestra el searchBox
        } else {
            searchBox.style.display = 'none'; // Oculta el searchBox
        }
    });

    // Añade un evento de clic al botón de limpieza
    limpiarBuscador.addEventListener('click', () => {
        inputBuscar.value = ''; // Borra el contenido del campo de búsqueda
    });
});
