import Pagination from 'tui-pagination';

const container = document.querySelector('#pagination');
const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 4,
  page: 1,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn current-color tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',
     moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>',
  },
};

export const pagination = new Pagination(container, options);

pagination.on('afterMove', function (eventData) {
  console.log('Page changed to', eventData.page);
});
