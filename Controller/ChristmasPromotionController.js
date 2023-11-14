import { Console } from '@woowacourse/mission-utils';
import EventService from '../Domain/EventService.js';

class ChristmasPromotionController {
  #eventService;

  #view;

  constructor({ EventService, View }) {
    this.#eventService = null;
    this.#view = View;
  }

  async start() {
    const dateNumber = await this.#view.readDate();
    const refinedOrderList = await this.#view.readOrder();
    this.#eventService = new EventService(dateNumber, refinedOrderList);
    this.#eventService.start();
  }
}

export default ChristmasPromotionController;
