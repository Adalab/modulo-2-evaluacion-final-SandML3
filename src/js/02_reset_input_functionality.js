'use strict';

const buttonReset = document.querySelector('.js-button-reset');

const resetInput = () => input.value = '';


const handlerFunctionReset = (event) => {
  event.preventDefault();
  resetResultsContainer();
  resetInput();
};



buttonReset.addEventListener('click', handlerFunctionReset);