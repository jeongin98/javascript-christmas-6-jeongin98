import ChristmasPromotionController from '../Controller/ChristmasPromotionController.js';
import EventService from '../Domain/EventService.js';
import View from '../View.js';

class App {
  #controller;

  constructor() {
    this.#controller = new ChristmasPromotionController({
      eventService: new EventService(),
      view: new View(),
    });
  }

  async run() {
    await this.#controller.start();
  }
}

export default App;
