import Validation from '../utils/validation.js';

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
});
