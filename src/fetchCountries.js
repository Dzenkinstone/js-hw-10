import Notiflix from 'notiflix';

export const Fetch = class Fetch {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`
    )
      .then(this.errorResponce)
      .then(data => data)
      .catch(error => console.log(error));
  }

  errorResponce(resp) {
    if (!resp.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return resp.json();
  }

  get query() {
    return this.value;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};
