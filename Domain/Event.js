class Event {
  #date;

  #orderList;

  #eventResult;

  constructor(date, orderList) {
    this.#date = date;
    this.#orderList = orderList;
    this.#eventResult = [];
  }

  startDiscountAndEvent() {
    // 할인 여부
    isDiscountOrder();
    // 할인
    startDiscount();
    // 이벤트
    startEvent();
  }
}

export default Event;
