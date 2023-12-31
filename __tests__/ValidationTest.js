import Validation from '../utils/validation.js';
import { ERROR_MESSAGE } from '../utils/messages.js';

describe('Validation 테스트', () => {
  test('입력받은 주문 정보를 정제한 뒤 반환', async () => {
    // given
    const input = '타파스-1,제로콜라-1';
    const passResult = [
      { category: 'Appetizer', menuName: '타파스', orderQuantity: 1 },
      { category: 'Drink', menuName: '제로콜라', orderQuantity: 1 },
    ];

    // when
    const result = Validation.changeIntoOrderInfo(input);

    // then
    expect(result).toEqual(passResult);
  });

  test.each([' ', '32', '-1', '23.5', 'three', '삼'])('checkDateInEventPeriod() - 날짜 입력 유효성 검사 - 1과 31일 사이 날짜 외 입력 시 에러 발생 시키는지 확인', (inputs) => {
    const result = () => Validation.checkDateInEventPeriod(inputs);

    expect(result).toThrowError(ERROR_MESSAGE.invalidDate);
  });

  test.each([[['해산물파스타-2', '초코케이크1']], [['해산물파스타3개', '초코케이크-1']], [['해산물파스타 - 2', '초코케이크-1']], [['해산물파스타 -2', '초코케이크-1', '코카콜라-3']], [['해산물파스타- 2', '초코케이크-1', '코카콜라-3']]])(
    'checkOrderStyle() - 주문 입력 유효성 검사 - 주문 형식이 예시와 다른 경우 에러 발생 시키는지 확인',
    (inputs) => {
      const result = () => Validation.checkOrderStyle(inputs);

      expect(result).toThrowError(ERROR_MESSAGE.invalidOrder);
    },
  );

  test.each([['레드와인-1,레드와인-1'], ['레드와인-1,레드와인-5'], ['레드와인-1,타파스-3,레드와인-5']])('checkDuplicateMenus() - 메뉴 중복 입력 시 에러 발생시키는지 확인', (inputs) => {
    const result = () => Validation.checkDuplicateMenus(inputs);

    expect(result).toThrowError(ERROR_MESSAGE.invalidOrder);
  });

  test.each([
    [[{ category: 'Main', menuName: '해산물파스타', orderQuantity: -1 }]],
    [
      [
        { category: 'Main', menuName: '해산물파스타', orderQuantity: 2 },
        { category: 'Drink', menuName: '레드와인', orderQuantity: -1 },
      ],
    ],
    [
      [
        { category: 'Main', menuName: '해산물파스타', orderQuantity: 'd' },
        { category: 'Drink', menuName: '레드와인', orderQuantity: 1 },
      ],
    ],
    [
      [
        { category: 'Main', menuName: '해산물파스타', orderQuantity: 3.4 },
        { category: 'Drink', menuName: '레드와인', orderQuantity: 1 },
      ],
    ],
  ])('checkOrderQuantity() - 메뉴의 개수가 1 이상의 숫자가 아닐 경우 에러 발생시키는지 확인', (inputs) => {
    const result = () => Validation.checkOrderQuantity(inputs);

    expect(result).toThrowError(ERROR_MESSAGE.invalidOrder);
  });
  test.each([
    [[{ category: 'Main', menuName: '해산물파스타', orderQuantity: 21 }]],
    [
      [
        { category: 'Main', menuName: '해산물파스타', orderQuantity: 13 },
        { category: 'Drink', menuName: '레드와인', orderQuantity: 8 },
      ],
    ],
  ])('checkOrderTotalQuantity() - 주문 개수 제한(주문 한 번에 최대 20개)을 넘어갈 경우 에러 발생시키는지 확인', (inputs) => {
    const result = () => Validation.checkOrderTotalQuantity(inputs);

    expect(result).toThrowError(ERROR_MESSAGE.invalidQuantityOrder);
  });

  test.each([
    [[{ category: 'Drink', menuName: '레드와인', orderQuantity: 7 }]],
    [
      [
        { category: 'Drink', menuName: '제로콜라', orderQuantity: 3 },
        { category: 'Drink', menuName: '샴페인', orderQuantity: 8 },
      ],
    ],
  ])('checkNoDrinkOnlyOrder() - 음료주문만 있을 경우 에러 발생시키는지 확인', (inputs) => {
    const result = () => Validation.checkNoDrinkOnlyOrder(inputs);

    expect(result).toThrowError(ERROR_MESSAGE.invalidOnlyDrinkOrder);
  });

  test.each(['콜라제로', '초코아이스크림', '바비큐', '파스타크리스마스', '쌈폐인'])('findCategory() - 고객이 메뉴판에 없는 메뉴를 입력하는 경우 에러 발생시키는지 확인', (inputs) => {
    const result = () => Validation.findCategory(inputs);

    expect(result).toThrowError(ERROR_MESSAGE.invalidOrder);
  });
});
