'use strict';


//Get favorites data from local storage.
const renderFavouritesDataLS = () => {
  favouriteAnimes = getDataLocalStorage('favouritesList');
  getSerieObj(favouriteAnimes,'favourites');
};

if (getDataLocalStorage('favouritesList') !== null) {
  renderFavouritesDataLS();
}