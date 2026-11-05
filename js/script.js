const labels = { black: 'Preto', white: 'Branco', red: 'Vermelho', green: 'Verde' };

const angles = {
  front: { file: 'front', label: 'frontal', index: '01 / 03' },
  three_quarter: { file: 'three_quarter', label: 'três quartos', index: '02 / 03' },
  side: { file: 'side', label: 'lateral', index: '03 / 03' }
};

let selectedColor = 'black';
let selectedAngle = 'three_quarter';

const productImage = document.querySelector('#productImage');
const selectedColorEl = document.querySelector('#selectedColor');
const stageCaption = document.querySelector('#stageCaption');
const stageIndex = document.querySelector('#stageIndex');
const frameLabel = stageCaption.closest('.frame-label');

function imagePath(color, angle) {
  return `img/${color}_${angle}.png`;
}

function updateProduct() {
  const view = angles[selectedAngle];
  productImage.classList.add('is-changing');
  frameLabel.classList.add('is-updating');
  stageIndex.classList.add('is-updating');

  window.setTimeout(() => {
    productImage.src = imagePath(selectedColor, view.file);
    productImage.alt = `Óculos Aurea na cor ${labels[selectedColor].toLowerCase()}, vista ${view.label}`;
    selectedColorEl.textContent = labels[selectedColor];
    stageCaption.textContent = `${labels[selectedColor]} · ${view.label}`;
    stageIndex.textContent = view.index;
    productImage.classList.remove('is-changing');
    frameLabel.classList.remove('is-updating');
    stageIndex.classList.remove('is-updating');
  }, 180);
}

document.querySelectorAll('.swatch').forEach((button) => {
  button.addEventListener('click', () => {
    selectedColor = button.dataset.color;
    document.querySelectorAll('.swatch').forEach((item) => {
      item.setAttribute('aria-pressed', item === button);
      item.classList.toggle('is-selected', item === button);
    });
    updateProduct();
  });
});

document.querySelectorAll('.angle').forEach((button) => {
  button.addEventListener('click', () => {
    selectedAngle = button.dataset.angle;
    document.querySelectorAll('.angle').forEach((item) => {
      item.setAttribute('aria-pressed', item === button);
      item.classList.toggle('is-selected', item === button);
    });
    updateProduct();
  });
});
