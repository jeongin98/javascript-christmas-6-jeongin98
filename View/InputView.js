import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE, ERROR_MESSAGE } from '../utils/messages.js';
// import Validation from '../utils/validation.js';

const InputView = {
  async readDate() {
    const isValidDate = false;
    let date;
    while (!isValidDate) {
      try {
        const userDateInput = await Console.readLineAsync(INPUT_MESSAGE.readDate);
        date = Number(userDateInput);
        // Validation. // throw Error
        isValidDate = true;
      } catch (error) {
        Console.print(error.message);
      }
    }
    return date;
  },

  async readOrder() {
    const order = await Console.readLineAsync(INPUT_MESSAGE.readOrder);
    // 유효성
    // 재검사
    return order;
  },
};

export default InputView;
