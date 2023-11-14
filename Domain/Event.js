import { Console } from '@woowacourse/mission-utils';
import Menu from './menu.js';

class Event {
  #date;

  #orderList;

  #eventResult;

  constructor(date, orderList) {
    this.#date = date;
    this.#orderList = orderList;
    this.#eventResult = {
      orderList: {},
      originalTotalCost: 0,
      freeGift: false,
      discounts: { christmas: 0, weekdays: 0, weekends: 0, special: 0, gift: 0 },
      totalDiscount: 0,
      costAfterDiscount: 0,
      eventBadge: null,
    };
  }

  startDiscountAndEvent() {
    // 할인 여부
    const isDiscountable = this.isDiscountOrder();
    // 할인
    this.startDiscount();
    // 이벤트
    // this.startEvent();

    return this.#eventResult;
  }

  isDiscountOrder() {
    const totalOrderCost = this.#orderList.reduce((total, order) => {
      const { category, menuName, orderQuantity } = order;
      const menuPrice = Menu[category][menuName].price;
      return total + menuPrice * orderQuantity;
    }, 0);

    let isDiscountable = false;
    if (totalOrderCost >= 10000) {
      isDiscountable = true;
    }
    return isDiscountable;
  }

  startDiscount() {}
}

export default Event;
