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

  // 동작되는 것 확인 후 함수 분리
  changeIntoOrderInfo(userOrderString) {
    const orderArray = userOrderString.split(',');
    const orderList = [];

    orderArray.forEach((orderItem) => {
      const [menuNameOrder, orderQuantityOrder] = orderItem.trim().split('-');

      let categoryFound = '';
      for (const [key, value] of Object.entries(Menu)) {
        if (value.hasOwnProperty(menuNameOrder)) {
          categoryFound = key;
          break;
        }
      }
      // 분기점
      if (categoryFound) {
        orderList.push({
          category: categoryFound,
          menuName: menuNameOrder,
          orderQuantity: parseInt(orderQuantityOrder, 10) || 0,
        });
      }
    });
    return orderList;
  },

  checkOrder(userOrderString) {
    const orderInfo = this.changeIntoOrderInfo(userOrderString);
    return orderInfo;
  },
};

export default Validation;
