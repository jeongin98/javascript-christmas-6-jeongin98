class ChristmasPromotionController {
  #eventService;

  #view;

  constructor({ EventService, View }) {
    this.#eventService = EventService;
    this.#view = View;
  }

  start() {}
}
