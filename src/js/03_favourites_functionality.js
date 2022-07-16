'use strict';

let favouriteAnimes = [];


const addFavouriteAnime = (card) => {
  const series = getDataLocalStorage(input.value);
  const serieSelected = parseInt(card.id);
  const selectedSerieObj = series.find(serie => serie.mal_id === serieSelected);
  const indexOfSelectedSerie = favouriteAnimes.findIndex(serie => serie.mal_id === serieSelected);
  indexOfSelectedSerie === -1
    ? favouriteAnimes.push(selectedSerieObj)
    : favouriteAnimes.splice(indexOfSelectedSerie, 1);
};

function handlerFunctionFavourite (event) {
  const card = event.currentTarget;
  addFavouriteAnime(card);
}

const addEventToSerie = () => {
  const results = document.querySelectorAll('.js-serie-card');
  results.forEach(card => card.addEventListener('click', handlerFunctionFavourite));
};

