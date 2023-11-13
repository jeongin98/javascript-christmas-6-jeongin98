import { Console } from '@woowacourse/mission-utils';

import InputView from './InputView.js';
import OutputView from './OutputView.js';

class View {
  #inputView;

  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async readDate() {
    const dateNumber = await this.#inputView.readDate();
    return dateNumber;
  }

  async readOrder() {
    const refinedOrderList = await this.#inputView.readOrder();
    return refinedOrderList;
  }
}

export default View;
