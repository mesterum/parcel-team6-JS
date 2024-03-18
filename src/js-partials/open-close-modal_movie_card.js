import { currentPage } from "./pagination";
//add and remove event listerner to movie card to open modal

const refs = {
  openModalBtn: document.querySelector('[data-modal-open-movie]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal(event) {
  if (event.currentTarget === refs.modal && event.target !== refs.modal) return
  refs.modal.classList.toggle('is-hidden');
  if (refs.modal.classList.contains('is-hidden')) {
    console.log("closing modal");
    currentPage.refreshPage();
  }
}


/*
const refs = {
  openModal: document.querySelector('.open-modal'),
  closeModal: document.querySelector('.closeModal'),
  modalInfo: document.querySelector('.info'),
  modal: document.querySelector('.modal'),
};

let isVisible = false;

refs.openModal.addEventListener('click', toggleModal);
refs.closeModal.addEventListener('click', toggleModal);
refs.modalInfo.style.display = 'flex';

export function toggleModal() {
  document.body.classList.toggle('is-hidden');
  refs.modalInfo.classList.toggle('is-hidden');
  refs.modalInfo.classList.toggle('is-open');
  isVisible
    ? document.body.removeEventListener('keydown', onKeyDown)
    : document.body.addEventListener('keydown', onKeyDown);
  refs.modalInfo.style.display = 'none';
  isVisible = !isVisible;
}

function onKeyDown(event) {
  event.code === 'Escape' ? toggleModal() : null;
}

/*
(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();*/
