'use strict';
const resultsContainer = document.querySelector('.js-results-container');
let favouriteAnimes = [];


// const addStyleFavourite = (array) => array.forEach(item => item.classList.add('favourite'));

// const renderFavourites = (favouriteAnimes) => getSerieObj(favouriteAnimes,'favourites');

const addToFavourites = (objet,htmlElement) => {
  favouriteAnimes.push(objet);
  htmlElement.classList.add('favourite');
};

const removeToFavourites = (indexOfElement,htmlElement) => {
  favouriteAnimes.splice(indexOfElement, 1);
  htmlElement.classList.remove('favourite');
};

const checkIfIsFavourite = (card) => {
  const series = getDataLocalStorage(input.value);
  const serieSelected = card;
  const idSerieSelected = parseInt(card.id);
  const selectedSerieObj = series.find(serie => serie.mal_id === idSerieSelected);
  const indexOfSelectedSerie = favouriteAnimes.findIndex(serie => serie.mal_id === idSerieSelected);
  indexOfSelectedSerie === -1
    ? addToFavourites(selectedSerieObj, serieSelected)
    : removeToFavourites(indexOfSelectedSerie, serieSelected);
};


// const selectFavouriteSeries = () => {
//   const seriesContainer = document.querySelector('.js-favourites-container');
//   const favouriteElements = seriesContainer.querySelectorAll('.js-serie-card');
//   addStyleFavourite(favouriteElements);
// };


//Click event listening on all result series.

function handlerClickResultsSeries (event) {
  const card = event.currentTarget;
  checkIfIsFavourite(card);
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
  resetContainer('favourites');
  getSerieObj(favouriteAnimes,'favourites');
  // renderFavourites(favouriteAnimes);
  // selectFavouriteSeries();
}

const addEventToResultsSerie = () => {
  const results = resultsContainer.querySelectorAll('.js-serie-card');
  results.forEach(card => card.addEventListener('click', handlerClickResultsSeries));
};


//Get favorites data from local storage.
const renderFavouritesDataLS = () => {
  favouriteAnimes = getDataLocalStorage('favouritesList');
  getSerieObj(favouriteAnimes,'favourites');
  // renderFavourites(favouriteAnimes);
  // selectFavouriteSeries();
};


if (getDataLocalStorage('favouritesList') !== null) {
  renderFavouritesDataLS();
}

