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
    // 크리스마스 디데이 할인(리턴 형식)
    // 평일 할인
    // 주말 할인
    // 특별 할인
  }

  notDiscount() {
    this.setMenuInOrderList();
    this.setOriginalTotalCost();
    this.#eventResult.freeGift = false;
    this.#eventResult.discounts = null;
    this.#eventResult.totalDiscount = 0;
    this.#eventResult.costAfterDiscount = this.#eventResult.originalTotalCost;
    this.#eventResult.orderList = null;
  }

  setMenuInOrderList() {
    this.#orderList.forEach(({ menuName, orderQuantity }, index) => {
      if (index > 0) {
        this.#eventResult.orderList += ', ';
      }
      this.#eventResult.orderList += `${menuName} ${orderQuantity}개`;
    });
  }

  setOriginalTotalCost() {
    this.#orderList.forEach(({ category, menuName, orderQuantity }) => {
      const menuPrice = Menu[category][menuName].price;
      this.#eventResult.originalTotalCost += menuPrice * orderQuantity;
      this.#eventResult.orderList[menuName] = orderQuantity;
    });
  }
}

export default Event;
