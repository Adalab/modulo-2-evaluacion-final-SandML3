'use strict';

const buttonReset = document.querySelector('.js-button-reset');

const resetInput = () => input.value = '';


const handlerFunctionReset = (event) => {
  event.preventDefault();
  resetContainer('results');
  resetInput();
};



buttonReset.addEventListener('click', handlerFunctionReset);