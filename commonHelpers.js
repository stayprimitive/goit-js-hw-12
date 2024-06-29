import{S as u,i as d}from"./assets/vendor-8c59ed88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();function f(o){const e="https://pixabay.com",l="/api/",n=new URLSearchParams({key:"44631017-28d3930dbc3d7d0d9679d8f71",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:18}),t=`${e}${l}?${n}`;return fetch(t,{headers:{}}).then(s=>{if(!s.ok)throw new Error(s.statusText);return s.json()})}function m(o){return o.map(e=>`<li class="element-gallery">
      <a class="gallery-link" href="${e.largeImageURL}">
    <img class="img-gallery" src="${e.webformatURL}" alt="${e.tags}">
    <ul class="list-info">
    <li class="item-info"><h3 class="title-text">Likes</h3>
    <p class="text">${e.likes}</p></li>
    <li class="item-info"><h3 class="title-text">Views</h3>
    <p class="text">${e.views}</p></li>
    <li class="item-info"><h3 class="title-text">Comments</h3>
    <p class="text">${e.comments}</p></li>
    <li class="item-info"><h3 class="title-text">Downloads</h3>
    <p class="text">${e.downloads}</p></li>
   </ul>
  </li>`).join("")}function p(){new u(".gallery a",{captionDelay:325,captionsData:"alt"}).refresh()}function h(){const o=document.querySelector(".loader");o.style.display="block"}function c(){const o=document.querySelector(".loader");o.style.display="none"}const g=document.querySelector(".form"),i=document.querySelector('input[name = "value"]'),a=document.querySelector(".gallery");c();g.addEventListener("submit",o=>{o.preventDefault(),i.value.trim()!==""&&(a.innerHTML="",h(),f(i.value.trim()).then(e=>{e.hits.length===0&&d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",maxWidth:350,backgroundColor:"red",messageColor:"white"}),i.value="";const l=m(e.hits);a.insertAdjacentHTML("beforeend",l),p(),c()}).catch(e=>console.log(e)))});
//# sourceMappingURL=commonHelpers.js.map
