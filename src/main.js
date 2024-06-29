// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


import { getImages } from './js/pixabay-api';
import { renderElement } from './js/render-functions';
import { lightBox } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';
import { hideButton } from './js/render-functions';
import { showButton } from './js/render-functions';


const form = document.querySelector('.form');
const input = document.querySelector('input[name = "value"]');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.loadButton')

let page;
let userValue;
let maxPage;
let maxHits = 0;
let perPage = 15;

hideLoader();
hideButton();

form.addEventListener('submit', formSubmit);

async function formSubmit(event) {
showLoader();
    event.preventDefault();
    hideButton();
    gallery.innerHTML = '';
  
userValue = input.value.trim();
  if (!userValue) {
    hideLoader();
    iziToast.error({
          message:
            "Please enter something",
            position: 'bottomCenter',
            maxWidth: 350,
            backgroundColor: 'red',
            messageColor: 'white',
        });
    return;
  }


    page = 1;
  showLoader();

  try {
    const max = await getImages(userValue);
    maxHits = Math.ceil(max.totalHits / perPage);

  const data = await getImages(userValue, page);
  if (data.hits.length === 0) {
          hideLoader();
  iziToast.error({
          message:
            "Sorry, there are no images matching your search query. Please try again!",
            position: 'bottomCenter',
            maxWidth: 350,
            backgroundColor: 'red',
            messageColor: 'white',
        });
            return;
      }

  
  
        const markup = renderElement(data.hits);
        gallery.innerHTML = markup;
    } catch (err) {(err) }

  
    
  lightBox.refresh();
  hideLoader();
    showButton();
    refresher();
}

loadButton.addEventListener('click', loadButtonClick);

async function loadButtonClick() {
    showLoader();
    hideButton();
    page += 1;

    try {
        const data = await getImages(userValue, page);
        const markup = renderElement(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
          lightBox.refresh();
    } catch (err) { console.log(err) }


    hideLoader();
    showButton();

    scroll();
    refresher();
}

function scroll() {
    const card = document.querySelector('li');
    const height = card.getBoundingClientRect().height;
    window.scrollBy({
        top: height*3,
        behavior: "smooth",
    });
}

function refresher() {
  if (page === maxPage) {
    hideButton();
    hideLoader();
    iziToast.error({
          message:
                "We're sorry, but you've reached the end of search results.",
            position: 'bottomCenter',
            maxWidth: 350,
            backgroundColor: 'red',
            messageColor: 'white',
        });
  }

  if (page >= maxHits) {
    hideButton();
  }
}
