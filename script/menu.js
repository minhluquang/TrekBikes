// let timingAnimation = 500

// Show hide menu

const hideMenuBtn = document.getElementById('barsBtn');
const hideMenu = document.getElementById('hide__menu')
const closeMenuBtn = document.getElementById('closeBtn')

hideMenuBtn.addEventListener('click', e => {
  hideMenu.classList.add('active')
})

closeMenuBtn.addEventListener('click', e => {
  hideMenu.classList.remove('active');
})
