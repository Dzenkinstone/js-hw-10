import './css/styles.css';
import debounce from 'lodash.debounce';
import { Fetch } from '../src/fetchCountries.js';
import Notiflix from 'notiflix';
const fetch = new Fetch();
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(event => {
    if (event.target.value != '') {
      fetch.query = event.target.value.trim();
      fetch.fetchCountries().then(dataChange);
    } else {
      clearContainer();
    }
  }, DEBOUNCE_DELAY)
);

function clearContainer() {
  refs.div.innerHTML = '';
}

function dataChange(data) {
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
