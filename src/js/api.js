import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
export class FotosAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async getPhotos() {
    const PARAMS = new URLSearchParams({
      key: '41198579-38b99c2f313870261687b3ac1',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });
    const url = `${BASE_URL}?${PARAMS}`;
    const { data } = await axios.get(url, PARAMS);
    return data;
  }

  incrementPage() {
    this.page += 1;
  }
  getPage() {
    return this.page;
  }
  resetPage() {
    this.page = 1;
  }
}
