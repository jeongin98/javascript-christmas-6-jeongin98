import { Console } from '@woowacourse/mission-utils';
import Menu from './menu.js';

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
    const isDiscountable = this.isDiscountOrder();
    // 할인
    // startDiscount();
    // 이벤트
    // startEvent();

    return this.#eventResult;
  }

  isDiscountOrder() {
    const totalOrderCost = this.#orderList.reduce((total, order) => {
      const { category, menuName, orderQuantity } = order;
      const menuPrice = Menu[category][menuName].price;
      return total + menuPrice * orderQuantity;
    }, 0);

    if (totalOrderCost >= 10000) {
      const isDiscountable = true;
    }
    return isDiscountable;
  }
}

export default Event;
