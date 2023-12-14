/**
  |============================
  | 
  |============================
*/
// const fotosAPI = new FotosAPI();
// const onSearchFotos = async e => {
//   e.preventDefault();
//   page = 1;
//   const searchQuery = e.target.elements.searchQuery.value;
//   fotosAPI.searchQuery = searchQuery;

//   if (fotosAPI.searchQuery === '') {
//     clearFotos();

//     Notify.failure('Please, enter your request');
//     return;
//   }
//   spinnerPlay();
//   try {
//     const data = await fotosAPI.getPhotos();
//     clearFotos();
//     const fotosArray = data.hits;
//     const totalHits = data.totalHits;
//     refs.galleryList.insertAdjacentHTML('beforeend', fotosTemplate(fotosArray));
//     lightbox.refresh();

//     if (fotosArray.length > 0) {
//       Notify.success(`Hooray! We found ${totalHits} images.`);
//     }
//     if (fotosAPI.getPage() < Math.ceil(totalHits / 40)) {
//       refs.loadMoreBtn.classList.remove('is-hidden');
//     }
//     if (fotosArray.length === 0) {
//       Notify.warning(
//         `Sorry, there are no images matching your search query. Please try again.`
//       );
//     }
//   } catch (error) {
//     Notify.failure(error.message);
//     refs.loadMoreBtn.classList.add('is-hidden');
//   } finally {
//     spinnerStop();
//   }
// };

// refs.form.addEventListener('submit', onSearchFotos);

// function clearFotos() {
//   fotosAPI.resetPage();
//   refs.galleryList.innerHTML = '';
//   refs.loadMoreBtn.classList.add('is-hidden');
// }

// const onLoadMoreFotos = async e => {
//   fotosAPI.incrementPage();
//   spinnerPlay();
//   try {
//     const data = await fotosAPI.getPhotos();
//     const fotosArray = data.hits;
//     const markup = fotosTemplate(fotosArray);
//     refs.galleryList.insertAdjacentHTML('beforeend', markup);
//     const totalHits = data.totalHits;
//     if (fotosAPI.getPage() === Math.ceil(totalHits / 40)) {
//       refs.loadMoreBtn.classList.add('is-hidden');
//       Notify.warning(
//         'We are sorry, but you have reached the end of search results.'
//       );
//     }
//   } catch (error) {
//     Notify.failure(error.message);
//     refs.loadMoreBtn.classList.add('is-hidden');
//   } finally {
//     spinnerStop();
//   }
// };
// refs.loadMoreBtn.addEventListener('click', onLoadMoreFotos);
