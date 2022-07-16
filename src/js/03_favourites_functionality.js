'use strict';

let favouriteAnimes = [];


const renderFavourites = (favouriteAnimes) => {
  getSerieObj(favouriteAnimes,'favourites');
};


const addFavouriteAnime = (card) => {
  const series = getDataLocalStorage('favouritesList');
  const serieSelected = parseInt(card.id);
  console.log(series);
  const selectedSerieObj = series.find(serie => serie.mal_id === serieSelected);
  const indexOfSelectedSerie = favouriteAnimes.findIndex(serie => serie.mal_id === serieSelected);
  indexOfSelectedSerie === -1
    ? favouriteAnimes.push(selectedSerieObj)
    : favouriteAnimes.splice(indexOfSelectedSerie, 1);
};


const addStyleFavourite = () => {
  const seriesContainer = document.querySelector('.js-favourites-container');
  const favouriteElements = seriesContainer.querySelectorAll('.js-serie-card');
  favouriteElements.forEach(item => item.classList.add('favourite'));
};


function handlerFunctionFavourite (event) {
  const card = event.currentTarget;
  addFavouriteAnime(card);
  resetContainer('favourites');
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
  renderFavourites(favouriteAnimes);
  addStyleFavourite();
}

const addEventToSerie = () => {
  const results = document.querySelectorAll('.js-serie-card');
  results.forEach(card => card.addEventListener('click', handlerFunctionFavourite));
};

const renderFavouritesDataLS = () => {
  favouriteAnimes = getDataLocalStorage('favouritesList');
  renderFavourites(favouriteAnimes);
  addStyleFavourite();
};

if (getDataLocalStorage('favouritesList') !== null) {
  renderFavouritesDataLS();
}
