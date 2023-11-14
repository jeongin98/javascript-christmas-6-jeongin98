import { Console } from '@woowacourse/mission-utils';
import Event from '../Domain/Event.js';

describe('Event 테스트', () => {
  test('할인 가능 여부 확인(총주문 금액이 10000원 이상)', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Appetizers', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drinks', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    const result = event.isDiscountOrder();

    // then
    expect(result).toStrictEqual(false);
  });

  test('결과로 넣을 주문 내역을 설정한다', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Appetizers', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drinks', menuName: '제로콜라', orderQuantity: 1 },
    ];

    const event = new Event(date, orderList);
    const result = { 타파스: 1, 제로콜라: 1 };
    const eventResultOrderList = event.getEventResult().orderList;

    // when
    event.setMenuInOrderList();

    // then
    expect(eventResultOrderList).toStrictEqual(result);
  });

  test('setOriginalTotalCost 총주문 금액 계산 함수', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Appetizers', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drinks', menuName: '제로콜라', orderQuantity: 1 },
    ];

    const event = new Event(date, orderList);
    const result = 8500;

    // when
    event.setOriginalTotalCost();
    const totalCost = event.getEventResult().originalTotalCost;

    // then
    expect(totalCost).toStrictEqual(result);
  });
});
