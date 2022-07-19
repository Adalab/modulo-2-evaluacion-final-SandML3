'use strict';


//Get favorites data from local storage.
const renderFavouritesDataLS = () => {
  favouriteAnimes = getDataLocalStorage('favouritesList');
  resetContainer('favourites');
  getSerieObj(favouriteAnimes,'favourites');
};

if (getDataLocalStorage('favouritesList') !== null) {
  renderFavouritesDataLS();
}


const renderNotFavourites = () => {
  if (favouriteAnimes.length  === 0) {
    const notFavourites = document.createElement('img');
    notFavourites.setAttribute('class', 'favourites__wrapper__defaultImage');
    notFavourites.src = './assets/images/not_favourites.png';
    notFavourites.setAttribute('alt', 'dibujito goku sorprendido');
    notFavourites.setAttribute('title', 'Gordito goku sorprendido');
    const favoritesContainer = document.querySelector('.js-favourites-wrapper');
    favoritesContainer.appendChild(notFavourites);
  }
};

renderNotFavourites();

