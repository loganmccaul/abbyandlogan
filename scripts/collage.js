const collage = document.querySelector('body');
const collageImages = [...document.querySelectorAll('.polaroid')];

const { width: collageWidth } = collage.getBoundingClientRect();
const { height: collageHeight } = document.querySelector('.collage').getBoundingClientRect();



let activeImage;

collageImages.forEach(img => {
  const { height: imgHeight, width: imgWidth } = img.getBoundingClientRect();
  img.style.transform = `translate( ${Math.random() * (collageWidth - imgWidth)}px, ${Math.random() * (collageHeight - imgHeight)}px)`;
});

const activateImage = (clientX, clientY, target) => {
  document.querySelector('.collage').appendChild(target);

  console.log(target.style.transform);
  const [offsetX, offsetY] = target.style.transform.match(/(-(\d+\.\d+))|(\d+\.\d+)|(-\d+)|(\d+)/g);

  console.log(offsetX, offsetY);

  activeImage = {
    element: target,
    posX:  clientX - offsetX,
    posY: clientY - offsetY
  }
}

const down = (evt) => {
  if (collageImages.includes(evt.target)) {
    evt.preventDefault();
    activateImage(evt.clientX, evt.clientY, evt.target);
  } else if (collageImages.includes(evt.target.parentElement)) {
    evt.preventDefault();
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