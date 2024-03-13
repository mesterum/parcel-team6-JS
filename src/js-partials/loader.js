const refs = { loader: document.querySelector('.loader') };

function removeLoader() {
  refs.loader.classList.add('loader-hidden');
}

function addLoader() {
  refs.loader.classList.remove('loader-hidden');
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.style.display = "none";
    // stop spiner
    const spinner = document.querySelector('.spinner');
    spinner.style.animation = "none";
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        hideLoader();
    }
});

export default function onPageLoadingSpinner() {
  const imgRef = document.querySelector('.movie__poster');

  addLoader();
  if (document.readyState === 'complete') {
    setTimeout(removeLoader, 500);
  }
}
