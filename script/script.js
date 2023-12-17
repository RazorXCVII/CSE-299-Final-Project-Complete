window.addEventListener('scroll', (e) => {
  const nav = document.querySelector('#head-nav');
  if (window.scrollY > 0) {
    nav.classList.add('shadow-lg');
  } else {
    nav.classList.remove('shadow-lg');
  }
});

window.addEventListener('scroll', () => {
  const toTop = document.querySelector('.to-top');
  if (window.scrollY > 100) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});
