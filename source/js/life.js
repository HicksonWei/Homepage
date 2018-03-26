const picture = document.getElementsByClassName('picture');
const imageGrid = document.getElementById('imageGrid');
const lightbox = document.getElementById('lightbox');
const showImage = document.querySelector('.showImage');
const description = document.querySelector('.description');
const close = document.querySelector('.close');

imageGrid.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') {
    for (let i = 0; i < picture.length; i++) {
      if (picture[i] === e.target) {
        console.log(picture[i]);
        lightbox.style.display = 'block';
        showImage.src = picture[i].src;
        description.innerHTML = picture[i].alt;
      }
    }
  }
});

close.addEventListener('click', () => {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
})

$(document).ready(function () {
  $('#imageGrid').justifiedGallery({
    rowHeight: 200,
    margins: 5,
    randomize: true
  });
});