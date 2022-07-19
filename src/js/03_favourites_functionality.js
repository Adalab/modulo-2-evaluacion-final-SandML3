'use strict';

// 'click' listener on series into results section.

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

function handlerClickResultsSeries (event) {
  const card = event.currentTarget;
  checkIfIsFavourite(card);
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
  resetContainer('favourites');
  getSerieObj(favouriteAnimes,'favourites');
}

const addEventToResultsSerie = () => {
  const results = resultsContainer.querySelectorAll('.js-serie-card');
  results.forEach(card => card.addEventListener('click', handlerClickResultsSeries));
};


//Delete of favourites functionality
const deleteSerieOfFavourites = (serieToDelete) => {
  const idElementSelected = parseInt(serieToDelete.id);
  const indexOfElement = favouriteAnimes.findIndex(favorito => favorito.mal_id === idElementSelected);
  favouriteAnimes.splice(indexOfElement, 1);
};

const updateSectionResults = () => {
  if (input.value) {
    const series = getDataLocalStorage(input.value);
    resetContainer('results');
    getSerieObj(series, 'results');
  }
};


const handlerFunctionIconsClick = (event) => {
  const serieToDelete = event.currentTarget.parentElement;
  deleteSerieOfFavourites(serieToDelete);
  resetContainer('favourites');
  getSerieObj(favouriteAnimes, 'favourites');
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
  updateSectionResults();
  renderNotFavourites();
};


const addEventToIcon = () => {
  const iconsElements = document.querySelectorAll('.card__icon');
  iconsElements.forEach(element => element.addEventListener('click', handlerFunctionIconsClick));
};

//Reset all favourites functionality.

const handlerFunctionResetFavourites = (event) => {
  event.preventDefault();
  resetContainer('favourites');
  favouriteAnimes.splice(0, favouriteAnimes.length);
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
  updateSectionResults();
  renderNotFavourites();
};

buttonResetFavourites.addEventListener('click', handlerFunctionResetFavourites);
