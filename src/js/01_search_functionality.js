'use strict';


//Create and define event on search button.
const buttonSearch = document.querySelector('.js-button-search');
const input = document.querySelector('.js-input');



const addIconResetFavourites = (container, serieCard) => {
  if (container === 'favourites') {
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-xmark card__icon');
    icon.setAttribute('title', 'Eliminar de favoritos');
    serieCard.appendChild(icon);
  }
  addEventToIcon();
};



const renderSerieObj = (serie, container) => {
  let sectionTitle =  '';
  container === 'results'
    ? sectionTitle = 'Resultados'
    : sectionTitle = 'Series favoritas';

  const seriesContainer = document.querySelector('.js-series-container');
  const subContainer = document.querySelector(`.js-${container}-container`);
  const wrapper = document.querySelector(`.js-${container}-wrapper`);

  const containerTitle = document.querySelector((`.js-${container}-title`));
  containerTitle.innerHTML = sectionTitle;

  const serieCard = document.createElement('article');
  serieCard.setAttribute('class', 'main__series__card js-serie-card');
  serieCard.setAttribute('id', serie.mal_id);

  const cardTitle = document.createElement('h4');
  cardTitle.setAttribute('class', 'card__title');
  const titleContent = document.createTextNode(serie.title);
  cardTitle.appendChild(titleContent);

  const imgConatiner = document.createElement('div');
  imgConatiner.style.backgroundImage = `url(${serie.images.jpg.image_url})`;
  imgConatiner.setAttribute('class', 'card__img');
  imgConatiner.setAttribute('title', serie.title);
  // const cardImg = document.createElement('img');
  // cardImg.setAttribute('src', serie.images.jpg.image_url);

  serieCard.append(imgConatiner, cardTitle);
  wrapper.appendChild(serieCard);
  seriesContainer.appendChild(subContainer);
  addIconResetFavourites(container, serieCard);
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

function messageNotFound () {
  const containerTitle = document.querySelector(('.js-results-title'));
  containerTitle.innerHTML = 'Resultados';

  const resultsContainer = document.querySelector('.js-results-wrapper');
  resultsContainer.innerHTML = '';
  const alertText = document.createElement('p');
  alertText.appendChild(document.createTextNode('No se ha encontrado ninguna coincidencia'));
  resultsContainer.appendChild(alertText);
}

const validateSeries = (series) => {
  if (series.length !== 0) {
    getSerieObj(series, 'results');
  } else {
    messageNotFound();
  }
};


const getApiData = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const series = data.data;
      saveResultsLocalStorage(series, input.value);
      validateSeries(series);
    });
};

const getDataLocalStorage = (key) => JSON.parse(localStorage.getItem(key));


const validateDataLS = (inputValue) => {
  if (getDataLocalStorage(inputValue).length !== 0) {
    const series = getDataLocalStorage(inputValue);
    getSerieObj(series, 'results');
  } else {
    messageNotFound();
  }
};


const searchDataInLocalStorage = (apiUrl, inputValue) => {
  localStorage.getItem(inputValue) !== null
    ? validateDataLS(inputValue)
    : getApiData(apiUrl);
};


const resetContainer = (container) => {
  const seriesContainer = document.querySelector(`.js-${container}-wrapper`);
  if (seriesContainer) {
    seriesContainer.innerHTML = '';
  }
};

const handlerFunctionClick = (event) => {
  event.preventDefault();
  resetContainer('results');
  const inputValue = input.value;
  const apiUrl = `https://api.jikan.moe/v4/anime?q=${inputValue}`;
  searchDataInLocalStorage(apiUrl, inputValue);
};

buttonSearch.addEventListener('click', handlerFunctionClick);



//Add keyup listener to avoid reload page when user press enter key.

const handlerFunctionWrite = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

input.addEventListener('keyup', handlerFunctionWrite);