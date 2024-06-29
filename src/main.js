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
let maxPage = 3;

hideLoader();
hideButton();

form.addEventListener('submit', formSubmit);

async function formSubmit(event) {
showLoader();
    event.preventDefault();
    hideButton();
    gallery.innerHTML = '';
  
userValue = input.value;
  if (!userValue) return;
  
    page = 1;
  showLoader();

try {
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
  if (data.totalHits > 0) {
                 hideLoader();
  iziToast.info({
          message:
           'Пошук успішний, але я обмежив кількість сторінок, щоб Ви дійшли до останньої',
            position: 'center',
            maxWidth: 350,
            backgroundColor: 'green',
            messageColor: 'white',
        });

      }

        const markup = renderElement(data.hits);
        gallery.innerHTML = markup;
    } catch (err) { showMessage(err) }

  
    
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
    } catch (err) { console.log(err) }

    lightBox.refresh();
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
}
