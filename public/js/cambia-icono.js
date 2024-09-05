document.querySelectorAll('.btn-custom').forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        icon.classList.toggle('bi-plus', isExpanded);
        icon.classList.toggle('bi-dash', !isExpanded);
    });
});