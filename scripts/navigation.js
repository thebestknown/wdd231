const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

