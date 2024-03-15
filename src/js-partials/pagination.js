import Pagination from 'tui-pagination';

const container = document.querySelector('#pagination');
const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
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
  // console.log('Page changed to', eventData.page);
  if (moviesFunction) runMoviesFunction(eventData.page);
});

let movieList = {
  "page": 1,
  "results": [],
  "total_pages": 1,
  "total_results": 1
},
  moviesFunction = async () => { };

async function runMoviesFunction(page) {
  try {
    movieList = await moviesFunction(page)
  } catch (error) {
    console.error("Error fetching and rendering movies:", error.message);
  }
}
export async function setMoviesFunction(getMovies) {
  moviesFunction = getMovies;
  await runMoviesFunction(1);
  pagination.reset(movieList.total_results);
  return movieList;
}

