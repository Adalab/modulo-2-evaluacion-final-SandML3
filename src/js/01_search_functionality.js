'use strict';


//Create and define event on search button.
const buttonSearch = document.querySelector('.js-button-search');
const input = document.querySelector('.js-input');



const renderSerieObj = (serie) => {
  const seriesContainer = document.querySelector('.js-series-container');
  const resultsContainer = document.querySelector('.js-results-container');

  const serieCard = document.createElement('article');
  serieCard.setAttribute('class', 'main__series__results__card');

  const cardTitle = document.createElement('h4');
  cardTitle.setAttribute('class', 'card__title');
  const titleContent = document.createTextNode(serie.title);
  cardTitle.appendChild(titleContent);

  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', serie.images.jpg.image_url);

  serieCard.append(cardTitle, cardImg);
  resultsContainer.appendChild(serieCard);
  seriesContainer.appendChild(resultsContainer);

};

const imageReplace = (serie) => {
  let serieImgUrl = serie.images.jpg.image_url;
  if (serieImgUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
    serie.images.jpg.image_url = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  }
};

const getSerieObj = (series) => {
  series.forEach(serie => {
    imageReplace(serie);
    renderSerieObj(serie);
  });
};

const getApiData = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const series = data.data;
      getSerieObj(series);
    });
};

const resetResultsContainer = () => {
  const resultsContainer = document.querySelector('.js-results-container');resultsContainer.innerHTML = '';
};

const handlerFunctionClick = (event) => {
  event.preventDefault();
  resetResultsContainer();
  const inputValue = input.value;
  const apiUrl = `https://api.jikan.moe/v4/anime?q=${inputValue}`;
  getApiData(apiUrl);
};

buttonSearch.addEventListener('click', handlerFunctionClick);

const handlerFunctionWrite = (event) => {
  event.preventDefault();
  if (event.key === 'Enter') {
    buttonSearch.click();
  }
};

input.addEventListener('keyup', handlerFunctionWrite);