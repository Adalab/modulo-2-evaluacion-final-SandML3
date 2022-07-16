'use strict';


//Create and define event on search button.
const buttonSearch = document.querySelector('.js-button-search');
const input = document.querySelector('.js-input');


// const chooseContainerTitle = (container) => {
//   container === 'results'
//     ? sectionTitle = 'Resultados'
//     : sectionTitle = 'Favoritos';
// }

const renderSerieObj = (serie, container) => {
  let sectionTitle =  '';
  container === 'results'
    ? sectionTitle = 'Resultados'
    : sectionTitle = 'Favoritos';

  const seriesContainer = document.querySelector('.js-series-container');
  const resultsContainer = document.querySelector(`.js-${container}-container`);

  const resultsContainerTitle = document.createElement('h2');
  const containerTitleContent = document.createTextNode(sectionTitle);
  resultsContainerTitle.appendChild(containerTitleContent);


  const serieCard = document.createElement('article');
  serieCard.setAttribute('class', 'main__series__results__card js-serie-card');
  serieCard.setAttribute('id', serie.mal_id);

  const cardTitle = document.createElement('h4');
  cardTitle.setAttribute('class', 'card__title');
  const titleContent = document.createTextNode(serie.title);
  cardTitle.appendChild(titleContent);

  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', serie.images.jpg.image_url);

  serieCard.append(cardTitle, cardImg);
  resultsContainer.append(resultsContainerTitle, serieCard);
  seriesContainer.appendChild(resultsContainer);
  addEventToSerie();
};

const imageReplace = (serie) => {
  let serieImgUrl = serie.images.jpg.image_url;
  if (serieImgUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
    serie.images.jpg.image_url = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  }
};

const getSerieObj = (series, container) => {
  series.forEach(serie => {
    imageReplace(serie);
    renderSerieObj(serie, container);
  });
};


const saveResultsLocalStorage = (data, key) => localStorage.setItem(key, JSON.stringify(data));


const getApiData = (url, inputValue) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const series = data.data;
      saveResultsLocalStorage(series, inputValue);
      getSerieObj(series, 'results');
    });
};

const getDataLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const searchDataInLocalStorage = (apiUrl, inputValue) => localStorage.getItem(inputValue) !== null
  ? getDataLocalStorage(inputValue)
  : getApiData(apiUrl, inputValue);


const resetContainer = (container) => {
  const resultsContainer = document.querySelector(`.js-${container}-container`);resultsContainer.innerHTML = '';
};

const handlerFunctionClick = (event) => {
  event.preventDefault();
  resetContainer('results');
  const inputValue = input.value;
  const apiUrl = `https://api.jikan.moe/v4/anime?q=${inputValue}`;
  const series = searchDataInLocalStorage(apiUrl, inputValue);
  getSerieObj(series, 'results');
};

buttonSearch.addEventListener('click', handlerFunctionClick);

const handlerFunctionWrite = (event) => {
  event.preventDefault();
  if (event.key === 'Enter') {
    buttonSearch.click();
  }
};

input.addEventListener('keyup', handlerFunctionWrite);