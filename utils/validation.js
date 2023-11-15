import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE } from './messages.js';
import Menu from '../Domain/menu.js';

const Validation = {
  checkDate(userDateNumber) {
    this.checkDateInEventPeriod(userDateNumber);
  },

  checkDateInEventPeriod(userDateNumber) {
    if (userDateNumber < 1 || userDateNumber > 31 || isNaN(userDateNumber)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  },

  notValidMenuOrder() {
    throw new Error(ERROR_MESSAGE.invalidOrder);
  },

  findCategory(menuNameOrder) {
    for (const [key, value] of Object.entries(Menu)) {
      if (value.hasOwnProperty(menuNameOrder)) {
        return key;
      }
    }
    this.notValidMenuOrder();
  },

  changeIntoOrderInfo(userOrderString) {
    const orderArray = userOrderString.split(',');
    const refinedOrderList = [];
    orderArray.forEach((orderItem) => {
      const [menuNameOrder, orderQuantityOrder] = orderItem.trim().split('-');
      const categoryFound = this.findCategory(menuNameOrder);
      if (categoryFound) {
        refinedOrderList.push({
          category: categoryFound,
          menuName: menuNameOrder,
          orderQuantity: parseInt(orderQuantityOrder, 10) || 0,
        });
      }
    });
    return refinedOrderList;
  },

  checkOrder(userOrderString) {
    this.checkOrderStyle(userOrderString);
    const refinedOrderList = this.changeIntoOrderInfo(userOrderString);
    this.checkOrderQuantity(refinedOrderList);
    // 코드
    return refinedOrderList;
  },

  checkOrderQuantity(refinedOrderList) {
    const isAllQuantityValid = refinedOrderList.every((order) => order.orderQuantity >= 1);

    if (!isAllQuantityValid) {
      throw new Error('개수가 이상해요');
    }
  },

  checkOrderStyle(userOrderInput) {
    const regex = /^[가-힣a-zA-Z0-9]+-\d+(,[가-힣a-zA-Z0-9]+-\d+)*$/;

    if (!regex.test(userOrderInput)) {
      throw new Error('주문 입력 형식이 올바르지 않습니다. 정확한 형식으로 다시 입력해주세요.');
    }
  },
};

export default Validation;
