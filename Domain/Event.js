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
    isDiscountable ? this.startDiscount() : this.notDiscount();
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

  startDiscount() {
    this.setMenuInOrderList();
    this.setOriginalTotalCost();
    // 크리스마스 디데이 할인
    this.weekdaysDiscount();
    this.weekendsDiscount();
    this.specialDiscount();
  }

  // 할인 미진행 함수
  notDiscount() {
    this.setMenuInOrderList();
    this.setOriginalTotalCost();
    this.#eventResult.freeGift = false;
    this.#eventResult.discounts = null;
    this.#eventResult.totalDiscount = 0;
    this.#eventResult.costAfterDiscount = this.#eventResult.originalTotalCost;
    this.#eventResult.eventBadge = null;
  }

  setMenuInOrderList() {
    this.#orderList.forEach(({ menuName, orderQuantity }) => {
      this.#eventResult.orderList[menuName] = orderQuantity;
    });
  }

  setOriginalTotalCost() {
    this.#orderList.forEach(({ category, menuName, orderQuantity }) => {
      const menuPrice = Menu[category][menuName].price;
      this.#eventResult.originalTotalCost += menuPrice * orderQuantity;
    });
  }

  specialDiscount() {
    if (this.#date % 7 === 3 || this.#date === 25) {
      this.#eventResult.discounts.special += -1000;
    }
  }

  weekdaysDiscount() {
    let dessertItemCount = 0;
    this.#orderList.forEach((order) => {
      if (order.category === 'Dessert') {
        dessertItemCount += order.orderQuantity;
      }
    });

    const remainder = this.#date % 7;
    if ((remainder === 0 || remainder === 3 || remainder === 4 || remainder === 5 || remainder === 6) && this.#date !== 25) {
      this.#eventResult.discounts.weekdays += dessertItemCount * -2023;
    }
  }

  weekendsDiscount() {
    let mainItemCount = 0;
    this.#orderList.forEach((order) => {
      if (order.category === 'Mains') {
        mainItemCount += order.orderQuantity;
      }
    });

    const remainder = this.#date % 7;
    if (remainder === 1 || remainder === 2) {
      this.#eventResult.discounts.weekends += mainItemCount * -2023;
    }
  }

  getEventResult() {
    return this.#eventResult;
  }
}

export default Event;
