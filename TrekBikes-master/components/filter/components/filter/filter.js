const filterIcon = document.querySelector('.filterIcon');
const filter_container = document.getElementById('filter');
const product_container = document.getElementById('product');
const dashBoardClose = document.getElementById('dash-board-icon-close');
const dashBoard = document.getElementById('dash-board');

function displayFilter() {
  if (window.innerWidth > 1000) {
    filterIcon.addEventListener('click', function () {
      if (filterIcon.classList.contains('open')) {
        filterIcon.classList.remove('open');
        filter_container.style.display = 'none';
        product_container.style.width = '100%';
      } else {
        filterIcon.classList.add('open');
        filter_container.style.display = 'block';
        product_container.style.width = '80%';
      }
    });
  } else {
    filter_container.style.display = 'none';
    filterIcon.addEventListener('click', () => {
      dashBoard.classList.toggle('show');
      console.log('filter container');
      dashBoardVisible = true;
    });
    dashBoardClose.addEventListener('click', () => {
      dashBoard.classList.toggle('show');
      filterVisible = true;
    });
  }
}
displayFilter();
window.addEventListener('resize', () => {
  document.location.reload();
});
