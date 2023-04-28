const collage = document.querySelector('.collage');
const collageImages = [...document.querySelectorAll('.polaroid')];

const { height: collageHeight, width: collageWidth } = collage.getBoundingClientRect();

let activeImage;

collageImages.forEach(img => {
  const { height: imgHeight, width: imgWidth } = img.getBoundingClientRect();
  img.style.transform = `translate( ${Math.random() * (collageWidth - imgWidth)}px, ${Math.random() * (collageHeight - imgHeight)}px)`;
});

const activateImage = (clientX, clientY, target) => {
  collage.appendChild(target);

  const [offsetX, offsetY] = target.style.transform.match(/(\d+\.\d+)|(\d+)/g);

  activeImage = {
    element: target,
    posX:  clientX - offsetX,
    posY: clientY - offsetY
  }
}

const down = (evt) => {
  evt.preventDefault();

  if (collageImages.includes(evt.target)) {
    activateImage(evt.clientX, evt.clientY, evt.target);
  } else if (collageImages.includes(evt.target.parentElement)) {
    activateImage(evt.clientX, evt.clientY, evt.target.parentElement);
  };
}

const up = () => {
  if (activeImage) {
    activeImage = null;
  }
}

const move = (evt) => {
  if (activeImage) {
    const x = evt.clientX - activeImage.posX;
    const y = evt.clientY - activeImage.posY;
    
    activeImage.element.style.transform = `translate(${x}px, ${y}px)`;
  }
}

collage.addEventListener('pointerdown', down);
collage.addEventListener('pointerup', up);
collage.addEventListener('pointermove', move);