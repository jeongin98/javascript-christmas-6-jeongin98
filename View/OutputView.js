import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../utils/messages.js';

const OutputView = {
  printMenu(orderList) {
    Console.print(OUTPUT_MESSAGE.orderMenu);
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
    Console.print(OUTPUT_MESSAGE.costBeforeDiscount);
    const formattedCost = originalTotalCost.toLocaleString();
    Console.print(`${formattedCost}원`);
  },

  printRecivedFreeGift(freeGift) {
    Console.print(OUTPUT_MESSAGE.freeGift);
    freeGift ? Console.print(OUTPUT_MESSAGE.oneChampagne) : Console.print(OUTPUT_MESSAGE.nothing);
  },

  printDiscounts(discounts) {
    Console.print(OUTPUT_MESSAGE.discountList);
    if (discounts === null) {
      Console.print(OUTPUT_MESSAGE.nothing);
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
    Console.print(OUTPUT_MESSAGE.totalDiscount);
    const formattedCost = totalDiscount.toLocaleString();
    Console.print(`${formattedCost}원`);
  },

  printCostAfterDiscount(costAfterDiscount) {
    Console.print(OUTPUT_MESSAGE.costAfterDiscount);
    const formattedCost = costAfterDiscount.toLocaleString();
    Console.print(`${formattedCost}원`);
  },

  printEventBadge(eventBadge) {
    Console.print(OUTPUT_MESSAGE.eventBadge);
    Console.print(eventBadge);
  },
};

export default OutputView;
