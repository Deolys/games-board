import { fireEvent, render, screen } from "@testing-library/react";
import { RockPaperScissors } from "../pages/rock-paper-scissors";
import '@testing-library/jest-dom';

describe('RockPaperScissors', () => {
  it('RockPaperScissors mounts properly', () => {
    const wrapper = render(<RockPaperScissors />);
    expect(wrapper).toMatchSnapshot();
  })

  test.each([
    ['камень', /Результат: (Вы выиграли!|Вы проиграли!|Ничья!)/i],
    ['ножницы', /Результат: (Вы выиграли!|Вы проиграли!|Ничья!)/i],
    ['бумага', /Результат: (Вы выиграли!|Вы проиграли!|Ничья!)/i],
  ])('При нажатии на кнопку результат должен быть определен', (buttonName, expectedResult) => {
    render(<RockPaperScissors />);
    const button = screen.getByRole('button', { name: new RegExp(buttonName, 'i') });

    fireEvent.click(button);

    const resultText = screen.getByText(expectedResult);
    expect(resultText).toBeInTheDocument();
  });
});