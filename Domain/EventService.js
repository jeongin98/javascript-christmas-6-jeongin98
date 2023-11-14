import Event from './Event.js';

class EventService {
  #event;

  constructor(date, orderList) {
    this.#event = new Event(date, orderList);
  }

  start() {}
}

export default EventService;
