import { getDetailFilmInfo } from './fetchMoviesAPI';
import { onWatchedLib, onQueueLib } from './storage';
import getRefs from './get-refs';

const refs = getRefs();
const data = {
  refs,
  getDetailFilmInfo,
  onWatchedLib,
  onQueueLib,
};

export default class OnModalEvents {
  constructor(data) {
    this.refs = refs;
    this.getDetailFilmInfo = getDetailFilmInfo;
    this.onWatchedLib = onWatchedLib;
    this.onQueueLib = onQueueLib;
  }
  q = null;
  w = null;

  loadEventListener = () => {
    this.refs.films.addEventListener('click', this.onModalOpen);
    this.refs.backdrop.addEventListener('click', this.onBackDropClick);
  };
  filmId = null;
  onModalOpen = e => {
    e.preventDefault();
    if (e.target.nodeName === 'UL') {
      return;
    }
    this.filmId = e.target.parentNode.parentNode.getAttribute('id');
    this.currentFilm();
    this.refs.body.classList.add('modal-open');
    this.refs.filmModal.classList.add('is-open');
    this.onModalLoadEventListener();
  };
  currentFilm = () => {
    this.getDetailFilmInfo(this.filmId);
  };
  onModalLoadEventListener = () => {
    this.refs.closeModalBtn.addEventListener('click', this.onModalClose);
    window.addEventListener('keydown', this.onKeyPress);
    this.loadStorageBtnListener();
  };
  loadStorageBtnListener = () => {
    this.delay(500)
      .then(() => {
        const w = document.querySelector('.modalBtn__item--watchedBtn');
        w.addEventListener('click', this.onWatchedLib);
      })
      .then(() => {
        const q = document.querySelector('.modalBtn__item--queueBtn');
        q.addEventListener('click', this.onQueueLib);
      });
  };
  delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
  onModalRemoveEventListener = () => {
    window.removeEventListener('keydown', this.onKeyPress);
  };
  onModalClose = e => {
    this.onModalRemoveEventListener();
    this.filmId = null;
    this.refs.filmModalInfo.innerHTML = '';
    this.refs.body.classList.remove('modal-open');
    this.refs.filmModal.classList.remove('is-open');
    localStorage.removeItem('currentFilm');
  };
  onKeyPress = e => {
    if (e.code === 'Escape') {
      this.onModalClose();
    }
  };
  onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.onModalClose();
    }
  };
  init = () => {
    this.loadEventListener();
  };
}

const modal = new OnModalEvents(data);
modal.init();