"use strict";const buttonSearch=document.querySelector(".js-button-search"),buttonReset=document.querySelector(".js-button-reset"),buttonResetFavourites=document.querySelector(".js-button-reset-favourites"),input=document.querySelector(".js-input"),resultsContainer=document.querySelector(".js-results-container");let favouriteAnimes=[];const addIconResetFavourites=(e,t)=>{if("favourites"===e){const e=document.createElement("i");e.setAttribute("class","fa-solid fa-xmark card__icon"),e.setAttribute("title","Eliminar de favoritos"),t.appendChild(e)}addEventToIcon()},checkIfResultIsInFavourites=(e,t)=>{-1!==favouriteAnimes.findIndex(t=>t.mal_id===e.mal_id)?t.setAttribute("class","main__series__card js-serie-card favourite"):t.setAttribute("class","main__series__card js-serie-card")},renderSerieObj=(e,t)=>{let r="";r="results"===t?"Resultados":"Series favoritas";const a=document.querySelector(".js-series-container"),s=document.querySelector(`.js-${t}-container`),n=document.querySelector(`.js-${t}-wrapper`);document.querySelector(`.js-${t}-title`).innerHTML=r;const o=document.createElement("article");o.setAttribute("id",e.mal_id),checkIfResultIsInFavourites(e,o);const i=document.createElement("h4");i.setAttribute("class","card__title");const u=document.createTextNode(e.title);i.appendChild(u);const c=document.createElement("div");c.style.backgroundImage=`url(${e.images.jpg.image_url})`,c.setAttribute("class","card__img"),c.setAttribute("title",e.title),o.append(c,i),n.appendChild(o),a.appendChild(s),addIconResetFavourites(t,o),addEventToResultsSerie()},imageReplace=e=>{"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"===e.images.jpg.image_url&&(e.images.jpg.image_url="https://via.placeholder.com/210x295/ffffff/666666/?text=TV")},getSerieObj=(e,t)=>{e.forEach(e=>{imageReplace(e),renderSerieObj(e,t)})},saveResultsLocalStorage=(e,t)=>localStorage.setItem(t,JSON.stringify(e));function messageNotFound(){document.querySelector(".js-results-title").innerHTML="Resultados";const e=document.querySelector(".js-results-wrapper");e.innerHTML="";const t=document.createElement("p");t.setAttribute("class","js-data-not-found"),t.appendChild(document.createTextNode("¡Ops! No se ha encontrado ninguna coincidencia")),e.append(t)}const isArrayEmpty=e=>0!==e.length?getSerieObj(e,"results"):messageNotFound(),getApiData=e=>{fetch(e).then(e=>e.json()).then(e=>{const t=e.data;saveResultsLocalStorage(t,input.value),isArrayEmpty(t)}).catch(e=>console.log("Se ha producido un error "+e))},getDataLocalStorage=e=>JSON.parse(localStorage.getItem(e)),searchDataInLocalStorage=(e,t)=>{const r=getDataLocalStorage(t);null!==r?isArrayEmpty(r):fetch(e).then(e=>e.json()).then(e=>{const t=e.data;saveResultsLocalStorage(t,input.value),isArrayEmpty(t)}).catch(e=>console.log("Se ha producido un error "+e))},resetContainer=e=>{const t=document.querySelector(`.js-${e}-wrapper`);t&&(t.innerHTML="")},handlerFunctionClick=e=>{e.preventDefault(),resetContainer("results");const t=input.value;searchDataInLocalStorage("https://api.jikan.moe/v4/anime?q="+t,t)};buttonSearch.addEventListener("click",handlerFunctionClick);const handlerFunctionWrite=e=>{"Enter"===e.key&&e.preventDefault()};input.addEventListener("keyup",handlerFunctionWrite);const resetInput=()=>input.value="",handlerFunctionReset=e=>{e.preventDefault(),resetContainer("results"),input.value=""};buttonReset.addEventListener("click",handlerFunctionReset);const addToFavourites=(e,t)=>{favouriteAnimes.push(e),t.classList.add("favourite")},removeToFavourites=(e,t)=>{favouriteAnimes.splice(e,1),t.classList.remove("favourite")},checkIfIsFavourite=e=>{const t=getDataLocalStorage(input.value),r=e,a=parseInt(e.id),s=t.find(e=>e.mal_id===a),n=favouriteAnimes.findIndex(e=>e.mal_id===a);var o,i;-1===n?(o=s,i=r,favouriteAnimes.push(o),i.classList.add("favourite")):removeToFavourites(n,r)};function handlerClickResultsSeries(e){const t=e.currentTarget;checkIfIsFavourite(t),saveResultsLocalStorage(favouriteAnimes,"favouritesList"),resetContainer("favourites"),getSerieObj(favouriteAnimes,"favourites")}const addEventToResultsSerie=()=>{resultsContainer.querySelectorAll(".js-serie-card").forEach(e=>e.addEventListener("click",handlerClickResultsSeries))},deleteSerieOfFavourites=e=>{const t=parseInt(e.id),r=favouriteAnimes.findIndex(e=>e.mal_id===t);favouriteAnimes.splice(r,1)},updateSectionResults=()=>{if(input.value){const e=getDataLocalStorage(input.value);resetContainer("results"),getSerieObj(e,"results")}},handlerFunctionIconsClick=e=>{const t=e.currentTarget.parentElement;deleteSerieOfFavourites(t),resetContainer("favourites"),getSerieObj(favouriteAnimes,"favourites"),saveResultsLocalStorage(favouriteAnimes,"favouritesList"),updateSectionResults(),renderNotFavourites()},addEventToIcon=()=>{document.querySelectorAll(".card__icon").forEach(e=>e.addEventListener("click",handlerFunctionIconsClick))},handlerFunctionResetFavourites=e=>{e.preventDefault(),resetContainer("favourites"),favouriteAnimes.splice(0,favouriteAnimes.length),saveResultsLocalStorage(favouriteAnimes,"favouritesList"),updateSectionResults(),renderNotFavourites()};buttonResetFavourites.addEventListener("click",handlerFunctionResetFavourites);const renderFavouritesDataLS=()=>{favouriteAnimes=getDataLocalStorage("favouritesList"),resetContainer("favourites"),getSerieObj(favouriteAnimes,"favourites")};null!==getDataLocalStorage("favouritesList")&&(favouriteAnimes=getDataLocalStorage("favouritesList"),resetContainer("favourites"),getSerieObj(favouriteAnimes,"favourites"));const renderNotFavourites=()=>{if(0===favouriteAnimes.length){const e=document.createElement("img");e.setAttribute("class","favourites__wrapper__defaultImage"),e.src="./assets/images/not_favourites.png",e.setAttribute("alt","dibujito goku sorprendido"),e.setAttribute("title","Gordito goku sorprendido");document.querySelector(".js-favourites-wrapper").appendChild(e)}};renderNotFavourites();