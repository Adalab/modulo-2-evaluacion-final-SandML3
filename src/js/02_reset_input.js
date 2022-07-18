'use strict';


//Reset search functionality.
const resetInput = () => input.value = '';

const handlerFunctionReset = (event) => {
  event.preventDefault();
  resetContainer('results');
  resetInput();
};

buttonReset.addEventListener('click', handlerFunctionReset);
