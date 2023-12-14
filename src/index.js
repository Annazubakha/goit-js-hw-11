import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { lightbox } from './js/lightbox';
import { FotosAPI } from './js/api';
import { fotosTemplate } from './js/template';
import { spinnerPlay, spinnerStop } from './js/spinner';

const refs = {
  form: document.querySelector('.form'),
  searchBtn: document.querySelector('.search-button'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryList: document.querySelector('.gallery'),
  spiner: document.querySelector('.js-backdrop'),
};
const fotosAPI = new FotosAPI();

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let callback = (entries, observer) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      fotosAPI.incrementPage();
      spinnerPlay();

      try {
        const data = await fotosAPI.getPhotos();
        const markup = fotosTemplate(data.hits);
        refs.galleryList.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        hasMorePhotos(data.totalHits);
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        spinnerStop();
      }
    }
  });
};

let observer = new IntersectionObserver(callback, options);
const onSearchFotos = async e => {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value;
  fotosAPI.searchQuery = searchQuery;

  if (searchQuery === '') {
    clearFotos();
    Notify.failure('Please, enter your request');
    return;
  }

  try {
    spinnerPlay();
    clearFotos();
    const data = await fotosAPI.getPhotos();
    const totalHits = data.totalHits;
    const markup = fotosTemplate(data.hits);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    if (data.hits.length === 0) {
      Notify.warning(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    if (data.hits.length > 0) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    hasMorePhotos(data.totalHits);
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
};

function clearFotos() {
  fotosAPI.resetPage();
  refs.galleryList.innerHTML = '';
}
refs.form.addEventListener('submit', onSearchFotos);

function hasMorePhotos(totalHits) {
  if (fotosAPI.getPage() < Math.ceil(totalHits / 40)) {
    const item = document.querySelector('.gallery_item:last-child');
    observer.observe(item);
  }
  if (fotosAPI.getPage() === Math.ceil(totalHits / 40)) {
    Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}
