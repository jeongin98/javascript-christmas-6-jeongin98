import Event from '../Domain/Event.js';

describe('Event 클래스 함수 테스트', () => {
  test('할인 가능 여부 확인(총주문 금액이 10000원 이상)', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Appetizer', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
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
      { category: 'Appetizer', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];

    const event = new Event(date, orderList);
    const result = { 타파스: 1, 제로콜라: 1 };

    const eventResultOrderList = event.getEventResult().orderList;

    // when
    event.setMenuInOrderList();

    // then
    expect(eventResultOrderList).toStrictEqual(result);
  });

  test('총주문 금액 계산이 잘 되었는지 확인한다', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Appetizer', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];

    const event = new Event(date, orderList);
    const result = 8500;

    // when
    event.setOriginalTotalCost();
    const totalCost = event.getEventResult().originalTotalCost;

    // then
    expect(totalCost).toStrictEqual(result);
  });

  test('할인 미진행시 결과 객체에 값들이 잘 저장되었는지 확인한다', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Appetizer', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];

    const event = new Event(date, orderList);
    const eventResult = {
      orderList: { 타파스: 1, 제로콜라: 1 },
      originalTotalCost: 8500,
      freeGift: false,
      discounts: null,
      totalDiscount: 0,
      costAfterDiscount: 8500,
      eventBadge: '없음',
    };

    // when
    event.notDiscount();

    // then
    expect(event.getEventResult()).toEqual(eventResult);
  });

  test('특별 할인 계산 로직이 작동하는지 확인한다', async () => {
    // given
    const date = 25;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.specialDiscount();
    const isMinused = event.getEventResult().discounts.special === -1000;

    // then
    expect(isMinused).toEqual(true);
  });

  test('디저트 개수에 따른 평일 할인 함수가 작동하는지 확인한다', async () => {
    // given
    const date = 6;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.weekdaysDiscount();
    const discountCost = event.getEventResult().discounts.weekdays;
    const result = 2 * -2023;

    // then
    expect(discountCost).toStrictEqual(result);
  });

  test('메뉴 개수에 따른 주말 할인 함수가 작동하는지 확인한다', async () => {
    // given
    const date = 1;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.weekendsDiscount();
    const discountCost = event.getEventResult().discounts.weekends;
    const result = 2 * -2023;

    // then
    expect(discountCost).toStrictEqual(result);
  });

  test('크리스마스 할인 함수가 작동하는지 확인한다', async () => {
    // given
    const date = 25;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.christmasDiscount();
    const discountCost = event.getEventResult().discounts.christmas;
    const result = -(1000 + (date - 1) * 100);

    // then
    expect(discountCost).toStrictEqual(result);
  });

  test('증정에 따른 할인이 계산되었는지 확인한다', async () => {
    // given
    const date = 25;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.startDiscountAndEvent();
    const giftDiscount = event.getEventResult().discounts.gift;
    const passResult = -25000;

    // then
    expect(giftDiscount).toStrictEqual(passResult);
  });

  test('샴페인 증정 이벤트 진행 함수가 작동하는지 확인한다', async () => {
    // given
    const date = 25;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.startDiscount();
    event.freeGiftEvent();
    const isFreeGiftReceived = event.getEventResult().freeGift;

    // then
    expect(isFreeGiftReceived).toStrictEqual(true);
  });

  test('총혜택 금액 계산이 잘 되는지 확인한다', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.startDiscountAndEvent();
    event.setTotalDiscountCost();
    const discountCost = event.getEventResult().totalDiscount;
    const result = -31246;

    // then
    expect(discountCost).toStrictEqual(result);
  });

  test('할인 후 예상 결제 금액 계산이 잘 되는지 확인한다', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.startDiscountAndEvent();
    const resultCost = event.getEventResult().costAfterDiscount;
    const passResult = 135754;

    // then
    expect(resultCost).toStrictEqual(passResult);
  });

  test('배지 증정 이벤트가 잘 진행되는지 확인한다', async () => {
    // given
    const date = 3;
    const orderList = [
      { category: 'Main', menuName: '티본스테이크', orderQuantity: 1 },
      { category: 'Main', menuName: '바비큐립', orderQuantity: 1 },
      { category: 'Dessert', menuName: '초코케이크', orderQuantity: 2 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];
    const event = new Event(date, orderList);

    // when
    event.startDiscountAndEvent();
    const resultBadge = event.getEventResult().eventBadge;
    const passBadge = '산타';

    // then
    expect(resultBadge).toStrictEqual(passBadge);
  });
});
