'use strict';


const deleteSerieOfFavourites = (serieToDelete) => {
  const idElementSelected = parseInt(serieToDelete.id);
  const indexOfElement = favouriteAnimes.findIndex(favorito => favorito.mal_id === idElementSelected);
  favouriteAnimes.splice(indexOfElement, 1);
};


const handlerFunctionIconsClick = (event) => {
  const serieToDelete = event.currentTarget.parentElement;
  deleteSerieOfFavourites(serieToDelete);
  resetContainer('favourites');
  getSerieObj(favouriteAnimes, 'favourites');
  // selectFavouriteSeries();
  saveResultsLocalStorage(favouriteAnimes, 'favouritesList');
};


const addEventToIcon = () => {
  const iconsElements = document.querySelectorAll('.card__icon');
  iconsElements.forEach(element => element.addEventListener('click', handlerFunctionIconsClick));
};