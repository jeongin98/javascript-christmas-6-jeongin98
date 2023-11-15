import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(orderList) {
    Console.print('\n<주문 메뉴>');
    let resultString = '';

    for (const [menuName, orderQuantity] of Object.entries(orderList)) {
      if (resultString !== '') {
        resultString += '\n';
      }
      resultString += `${menuName} ${orderQuantity}개`;
    }
    Console.print(resultString);
  },

  printoriginalTotalCost(originalTotalCost) {
    Console.print('\n<할인 전 총주문 금액>');
    const formattedCost = originalTotalCost.toLocaleString();
    Console.print(`${formattedCost}원`);
  },

  printRecivedFreeGift(freeGift) {
    Console.print('\n<증정 메뉴>');
    freeGift ? Console.print('샴페인 1개') : Console.print('없음');
  },

  printDiscounts(discounts) {
    Console.print('\n<혜택 내역>');
    if (discounts === null) {
      Console.print('없음');
      return;
    }
    Console.print(`크리스마스 디데이 할인: ${discounts.christmas.toLocaleString()}원`);
    const weekdayDiscount = discounts.weekdays;
    const weekendDiscount = discounts.weekends;
    const applicableDiscount = weekdayDiscount !== 0 ? weekdayDiscount : weekendDiscount;
    if (applicableDiscount !== 0) {
      const dayType = weekdayDiscount !== 0 ? '평일' : '주말';
      Console.print(`${dayType} 할인: ${applicableDiscount.toLocaleString()}원`);
    }
    Console.print(`특별 할인: ${discounts.special.toLocaleString()}원`);
    if (discounts.gift) {
      Console.print(`증정 이벤트: ${discounts.gift.toLocaleString()}원`);
    }
  },

  printTotalDiscount(totalDiscount) {
    Console.print('\n<총혜택 금액>');
    const formattedCost = totalDiscount.toLocaleString();
    Console.print(`${formattedCost}원`);
  },

  printCostAfterDiscount(costAfterDiscount) {
    Console.print('\n<할인 후 예상 결제 금액>');
    const formattedCost = costAfterDiscount.toLocaleString();
    Console.print(`${formattedCost}원`);
  },

  printEventBadge(eventBadge) {
    Console.print('\n<12월 이벤트 배지>');
    Console.print(eventBadge);
  },
};

export default OutputView;
