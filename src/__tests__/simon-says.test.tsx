import { fireEvent, render, screen } from "@testing-library/react";
import { SimonSaysGame } from "../pages/simon-says";

describe('SimonSaysGame', () => {
  it('SimonSaysGame mounts properly', () => {
    const { container } = render(<SimonSaysGame />);
    expect(container).toMatchSnapshot();
  })

  it('Button works', () => {
    render(<SimonSaysGame />);
    const colorButton = screen.getByTestId('red');
    fireEvent.click(colorButton);
  })
});