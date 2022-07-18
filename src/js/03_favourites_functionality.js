'use strict';


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
