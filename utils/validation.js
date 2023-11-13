import { ERROR_MESSAGE } from './messages.js';
// import Menu from '../Domain/menu.js'

const Validation = {
  checkDate(userDateNumber) {
    this.checkDateInEventPeriod(userDateNumber);
  },

  checkDateInEventPeriod(userDateNumber) {
    if (userDateNumber < 1 || userDateNumber > 31 || isNaN(userDateNumber)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  },

  // 주문 정보를 정제한 뒤 반환하는 함수 이용
  changeIntoOrderInfo(userOrderString){
    // Menu 이용해서 데이터 정제
  }

  checkOrder(userOrderString){
    const orderInfo = this.changeIntoOrderInfo(userOrderString);
    return orderInfo;
  }


};

export default Validation;
