'use strict';

let favouriteAnimes = [];


const addStyleFavourite = (array) => array.forEach(item => item.classList.add('favourite'));


const renderFavourites = (favouriteAnimes) => getSerieObj(favouriteAnimes,'favourites');


const addFavouriteAnime = (card) => {
  const series = getDataLocalStorage(input.value);
  const serieSelected = parseInt(card.id);
  const selectedSerieObj = series.find(serie => serie.mal_id === serieSelected);
  const indexOfSelectedSerie = favouriteAnimes.findIndex(serie => serie.mal_id === serieSelected);
  indexOfSelectedSerie === -1
    ? favouriteAnimes.push(selectedSerieObj)
    : favouriteAnimes.splice(indexOfSelectedSerie, 1);
};


const selectFavouriteSeries = () => {
  const seriesContainer = document.querySelector('.js-favourites-container');
  const favouriteElements = seriesContainer.querySelectorAll('.js-serie-card');
  addStyleFavourite(favouriteElements);
};


//Click event listening on all result series.

function handlerClickResultsSeries (event) {
  const card = event.currentTarget;
  addFavouriteAnime(card);
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
  resetContainer('favourites');
  renderFavourites(favouriteAnimes);
  selectFavouriteSeries();
}

const addEventToSerie = () => {
  const resultsContainer = document.querySelector('.js-results-container');
  const results = resultsContainer.querySelectorAll('.js-serie-card');
  results.forEach(card => card.addEventListener('click', handlerClickResultsSeries));
};


//Get favorites data from local storage.
const renderFavouritesDataLS = () => {
  favouriteAnimes = getDataLocalStorage('favouritesList');
  renderFavourites(favouriteAnimes);
  selectFavouriteSeries();
};


if (getDataLocalStorage('favouritesList') !== null) {
  renderFavouritesDataLS();
}

