const priceRangeMin = document.getElementById('priceRangeMin');
const priceRangeMax = document.getElementById('priceRangeMax');
const priceValueMin = document.getElementById('priceValueMin');
const priceValueMax = document.getElementById('priceValueMax');
const rangeBar = document.getElementById('rangeBar');
const priceGap = 185000; // Define la diferencia mínima permitida

function updateValues() {
  let minValue = parseInt(priceRangeMin.value);
  let maxValue = parseInt(priceRangeMax.value);

  // Asegúrate de que la diferencia mínima se mantenga
  if (maxValue - minValue < priceGap) {
    if (priceRangeMin === document.activeElement) {
      minValue = maxValue - priceGap;
      priceRangeMin.value = minValue;
    } else if (priceRangeMax === document.activeElement) {
      maxValue = minValue + priceGap;
      priceRangeMax.value = maxValue;
    }
  }

  priceValueMin.textContent = `$${minValue}`;
  priceValueMax.textContent = `$${maxValue}`;
  const minPercent = (minValue / priceRangeMin.max) * 100;
  const maxPercent = (maxValue / priceRangeMax.max) * 100;

  priceValueMin.style.left = `calc(${minPercent}% - 10px)`;
  priceValueMax.style.left = `calc(${maxPercent}% - 10px)`;

  // Actualiza la posición y el tamaño de la barra de color
  rangeBar.style.left = `${minPercent}%`;
  rangeBar.style.width = `${maxPercent - minPercent}%`;
}

priceRangeMin.addEventListener('input', updateValues);
priceRangeMax.addEventListener('input', updateValues);

// Inicializar los valores
updateValues();
