// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


import { findImage } from './js/pixabay-api';
import { renderElement } from './js/render-functions';
import { imgGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name = "value"]');
const gallery = document.querySelector('.gallery');

hideLoader();

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim() === '') {
    return;
  }

  gallery.innerHTML = '';

  showLoader();

  findImage(input.value.trim())
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
                'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            maxWidth: 350,
            backgroundColor: 'red',
            messageColor: 'white',
        });
          
      }
      input.value = '';
      const markup = renderElement(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      imgGallery();
      hideLoader();
    })
    .catch(err => console.log(err));
});