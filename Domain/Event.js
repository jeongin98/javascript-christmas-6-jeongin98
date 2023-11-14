import { Console } from '@woowacourse/mission-utils';
import Menu from './menu.js';
import CONSTANTS from '../utils/constants.js';

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
      eventBadge: '',
    };
  }

  startDiscountAndEvent() {
    const isDiscountable = this.isDiscountOrder();

    isDiscountable ? this.startDiscount() : this.notDiscount();

    this.freeGiftEvent();
    this.badgeEvent();

    return this.#eventResult;
  }

  isDiscountOrder() {
    const totalOrderCost = this.#orderList.reduce((total, order) => {
      const { category, menuName, orderQuantity } = order;
      const menuPrice = Menu[category][menuName].price;
      return total + menuPrice * orderQuantity;
    }, 0);

    let isDiscountable = false;
    if (totalOrderCost >= CONSTANTS.thresholdDiscountCost) {
      isDiscountable = true;
    }
    return isDiscountable;
  }

  startDiscount() {
    this.setMenuInOrderList();
    this.setOriginalTotalCost();
    this.christmasDiscount();
    this.weekdaysDiscount();
    this.weekendsDiscount();
    this.specialDiscount();
    this.freeGiftDiscount();
    this.setTotalDiscountCost();
    this.setCostAfterDiscount();
  }

  notDiscount() {
    this.setMenuInOrderList();
    this.setOriginalTotalCost();
    this.#eventResult.freeGift = false;
    this.#eventResult.discounts = null;
    this.#eventResult.totalDiscount = 0;
    this.#eventResult.costAfterDiscount = this.#eventResult.originalTotalCost;
    this.#eventResult.eventBadge = '없음';
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

  christmasDiscount() {
    if (this.#date >= 1 && this.#date <= 25) {
      this.#eventResult.discounts.christmas += -(1000 + (this.#date - 1) * 100);
    }
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
      this.#eventResult.discounts.weekdays += dessertItemCount * -CONSTANTS.year;
    }
  }

  weekendsDiscount() {
    let mainItemCount = 0;
    this.#orderList.forEach((order) => {
      if (order.category === 'Main') {
        mainItemCount += order.orderQuantity;
      }
    });

    const remainder = this.#date % 7;
    if (remainder === 1 || remainder === 2) {
      this.#eventResult.discounts.weekends += mainItemCount * -CONSTANTS.year;
    }
  }

  freeGiftEvent() {
    if (this.#eventResult.originalTotalCost >= CONSTANTS.thresholdFreeGiftCost) {
      this.#eventResult.freeGift = true;
    }
  }

  freeGiftDiscount() {
    if (this.#eventResult.originalTotalCost > CONSTANTS.thresholdFreeGiftCost || this.#eventResult.freeGift === true) {
      this.#eventResult.discounts.gift -= CONSTANTS.freeGiftCost;
    }
  }

  setTotalDiscountCost() {
    const { discounts } = this.#eventResult;
    const totalDiscount = Object.values(discounts).reduce((total, discount) => total + discount, 0);
    this.#eventResult.totalDiscount = totalDiscount;
  }

  setCostAfterDiscount() {
    this.#eventResult.costAfterDiscount = this.#eventResult.originalTotalCost + this.#eventResult.totalDiscount;
  }

  badgeEvent() {
    const { totalDiscount } = this.#eventResult;
    if (-totalDiscount >= 20000) {
      this.#eventResult.eventBadge = '산타';
      return;
    }
    if (-totalDiscount >= 10000) {
      this.#eventResult.eventBadge = '트리';
      return;
    }
    if (-totalDiscount >= 5000) {
      this.#eventResult.eventBadge = '별';
      return;
    }
    this.#eventResult.eventBadge = '없음';
  }

  getEventResult() {
    return this.#eventResult;
  }
}

export default Event;
