export const Fetch = class Fetch {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    });
  }

  get query() {
    return this.value;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};
