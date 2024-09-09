document.addEventListener('DOMContentLoaded', function() {
    const thumbMin = document.getElementById('thumbMin');
    const thumbMax = document.getElementById('thumbMax');
    const priceRange = document.getElementById('priceRange');
    const slider = document.querySelector('.slider');
    const sliderWidth = slider.offsetWidth;

    function updatePriceRange() {
        const minPrice = Math.round((parseFloat(thumbMin.style.left) / sliderWidth) * 100);
        const maxPrice = Math.round((parseFloat(thumbMax.style.left) / sliderWidth) * 100);
        priceRange.textContent = `$${minPrice} - $${maxPrice}`;
    }

    function onDrag(event, thumb) {
        event.preventDefault();
        const shiftX = event.clientX - thumb.getBoundingClientRect().left;

        function moveAt(pageX) {
            let newLeft = pageX - shiftX - slider.getBoundingClientRect().left;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > sliderWidth) newLeft = sliderWidth;
            thumb.style.left = newLeft + 'px';
            updatePriceRange();
        }

        function onMouseMove(event) {
            moveAt(event.clientX);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    }

    thumbMin.addEventListener('mousedown', function(event) {
        onDrag(event, thumbMin);
    });

    thumbMax.addEventListener('mousedown', function(event) {
        onDrag(event, thumbMax);
    });

    updatePriceRange();
});
