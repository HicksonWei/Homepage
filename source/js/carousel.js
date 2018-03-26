let coverIndex = 0;

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const covers = document.getElementsByClassName('covers');
const dots = document.getElementsByClassName('dot');
const indicators = document.querySelector('.indicator');


const showCover = (n) => {
  for (let i = 0; i < covers.length; i++) {
    covers[i].style.display = 'none';
    dots[i].className = dots[i].className.replace(' active', '');
  }
  covers[n].style.display = 'block';
  dots[n].className += ' active';
};

// 上一張
prev.addEventListener('click', (e) => {
  e.preventDefault();
  if (coverIndex === 0) {
    coverIndex = covers.length - 1;
  } else {
    coverIndex--;
  }
  showCover(coverIndex);
}, false);

// 下一張
next.addEventListener('click', (e) => {
  e.preventDefault();
  if (coverIndex === covers.length - 1) {
    coverIndex = 0;
  } else {
    coverIndex++;
  }
  showCover(coverIndex);
});


// 點擊圓點切換畫面
indicators.addEventListener('click', (e) => {
  if (e.target !== dots[coverIndex]) {
    for (let i = 0; i < dots.length; i++) {
      if (dots[i] === e.target) {
        coverIndex = i;
      }
    }
    showCover(coverIndex);
    return;
  } else {
    return;
  }
}, false);

// 初始載入
showCover(coverIndex);

// 定時自動切換
const change = () => {
  setTimeout(() => {
    if (coverIndex === covers.length - 1) {
      coverIndex = 0;
    } else {
      coverIndex++;
    }
    showCover(coverIndex);
    change();
  }, 10000);
};

// change();