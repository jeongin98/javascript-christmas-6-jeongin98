import { Console } from '@woowacourse/mission-utils';

class ChristmasPromotionController {
  #eventService;

  #view;

  constructor({ EventService, View }) {
    this.#eventService = EventService;
    this.#view = View;
  }

  async start() {
    const dateNumber = await this.#view.readDate();
    const refinedOrderList = await this.#view.readOrder();
  }
}

export default ChristmasPromotionController;
