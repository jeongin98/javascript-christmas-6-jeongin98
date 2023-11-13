import InputView from './InputView.js';
import OutputView from './OutputView.js';

class View {
  #inputView;

  #outputView;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  readDate() {
    const dateNumber = this.#inputView.readDate();
    return dateNumber;
  }
}
