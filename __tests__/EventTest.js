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
});
