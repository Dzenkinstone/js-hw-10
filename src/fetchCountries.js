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
      .then(this.dataChange)
      .catch(error => console.log(error));
  }

  errorResponce(resp) {
    if (!resp.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return resp.json();
  }

  dataChange(data) {
    if (data.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length >= 2) {
      return (refs.div.innerHTML = data
        .map(elements => {
          return `<div class="country-container"><img class="country-img" height="20" width="20" src="${elements.flags.svg}"><span class="country-name">${elements.name.official}</span></div>`;
        })
        .join(''));
    }

    return (refs.div.innerHTML = data
      .map(elements => {
        return `<div class="js-container"><img class="js-img" height="25" width="25" src="${
          elements.flags.svg
        }"><h1 class="js-title">${
          elements.name.official
        }</h1><span><strong>Capital:</strong> ${
          elements.capital
        }</span><span><strong>Population:</strong> ${
          elements.population
        }</span><span><strong>Languages:</strong> ${Object.values(
          elements.languages
        )}</span></div>`;
      })
      .join(''));
  }

  get query() {
    return this.value;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};
