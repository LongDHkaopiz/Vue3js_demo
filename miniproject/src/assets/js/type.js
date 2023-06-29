const imageContainer = document.querySelector('.image-container');
const image = imageContainer.querySelector('img');
const textOverlay = imageContainer.querySelector('.text-overlay');

imageContainer.addEventListener('mouseenter', () => {
  image.style.transform = 'scale(1.2)';
  textOverlay.style.opacity = 1;
});

imageContainer.addEventListener('mouseleave', () => {
  image.style.transform = 'scale(1)';
  textOverlay.style.opacity = 0;
});