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

  printResult(eventResult) {
    this.#outputView.printMenu(eventResult.orderList);
    this.#outputView.printoriginalTotalCost(eventResult.originalTotalCost);
    this.#outputView.printRecivedFreeGift(eventResult.freeGift);
    this.#outputView.printDiscounts(eventResult.discounts);
    this.#outputView.printTotalDiscount(eventResult.totalDiscount);
    this.#outputView.printCostAfterDiscount(eventResult.costAfterDiscount);
    this.#outputView.printEventBadge(eventResult.eventBadge);
  }
}

export default View;
