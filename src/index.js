import './css/styles.css';
import debounce from 'lodash.debounce';
import { Fetch } from './fetchCountries';
import Notiflix from 'notiflix';
const fetch = new Fetch();
console.log(fetch.dataChange);
refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
console.log(refs.input);
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(event => {
    if (event.target.value != '') {
      fetch.query = event.target.value.trim();
      fetch.fetchCountries();
    } else {
      clearContainer();
    }
  }, DEBOUNCE_DELAY)
);

function clearContainer() {
  refs.div.innerHTML = '';
}
