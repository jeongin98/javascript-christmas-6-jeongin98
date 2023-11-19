import Event from './Event.js';

class EventService {
  #event;

  constructor(date, orderList) {
    this.#event = new Event(date, orderList);
  }

  start() {
    const eventResult = this.#event.startDiscountAndEvent();
    return eventResult;
  }
}

export default EventService;
